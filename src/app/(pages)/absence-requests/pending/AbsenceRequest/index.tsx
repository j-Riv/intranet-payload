'use client';
import React, { Fragment, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import type { AbsenceRequest } from '../../../../../payload/payload-types';
import { Button } from '../../../../_components/Button';
import { Input } from '../../../../_components/Input';
import { Message } from '../../../../_components/Message';
import { useAuth } from '../../../../_providers/Auth';
import { sendEmail } from '../../../../_utilities/sendEmail';
import { revalidate } from '../../actions';

import classes from './index.module.scss';

type Props = {
  absenceRequest: AbsenceRequest;
};

type FormData = {
  username: string;
  email: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  comments: string;
};

const PendingAbsenceRequest: React.FC<Props> = ({ absenceRequest }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<React.ReactNode | null>(null);

  const { id, approved, slug, title, dateFrom, dateTo, populatedUser, userComments } =
    absenceRequest;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<FormData>();

  const { user } = useAuth();

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!user) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/absence-requests/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              approved: data.status,
              approver: user.id,
              adminComments: data.comments,
              decisionDate: new Date().toISOString(),
            }),
          },
        );

        const json: AbsenceRequest & {
          message?: string;
        } = await res.json();

        if (!res.ok) throw new Error(json.message);

        setError(null);

        setSuccess(<Fragment>{'Absence request was submitted successfully.'}</Fragment>);

        // send email on success
        const args = {
          to: populatedUser?.email,
          cc: [],
          subject: `Absence Reques for ${populatedUser?.name} ${data.status}`,
          html: `
            <p style="margin-bottom: 20px;">This is an automated message, please do not reply.</p>
            <p>Hello ${populatedUser.name},</p>
            <p>Your absence request from ${moment(dateFrom).format('MM-DD-YYYY')} to ${moment(
            dateTo,
          ).format('MM-DD-YYYY')} has been ${data.status}.</p>
            <p>If you have any questions or concerns please contact ${user.name}</p>
            <p><strong>Comments:</strong> ${data.comments}</p>
          `,
        };

        await sendEmail(args);

        setTimeout(() => {
          revalidate(data.email);
        }, 1000);
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.');
      }
    },
    [user, id, populatedUser?.email, populatedUser.name, dateFrom, dateTo],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      <Input
        name="username"
        label="Name"
        required
        register={register}
        error={errors.username}
        type="text"
        defaultValue={populatedUser?.name}
        readOnly
      />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
        defaultValue={populatedUser?.email}
        readOnly
      />
      <div className={classes.dateContainer}>
        <Input
          name="startDate"
          label="Start Date"
          required
          register={register}
          error={errors.startDate}
          type="text"
          defaultValue={moment(dateFrom).format('MM-DD-YYYY')}
          readOnly
        />
        <Input
          name="endDate"
          label="End Date"
          required
          register={register}
          error={errors.endDate}
          type="text"
          defaultValue={moment(dateTo).format('MM-DD-YYYY')}
          readOnly
        />
      </div>
      <Input
        name="reason"
        label="Reason"
        register={register}
        error={errors.reason}
        type="text"
        defaultValue={userComments}
        readOnly
      />
      <label htmlFor="approve">
        <input
          {...register('status', { required: true, value: 'approved' })}
          type="radio"
          value="approved"
          id="approve"
        />{' '}
        Approve
      </label>
      <label htmlFor="deny">
        <input
          {...register('status', {
            required: true,
          })}
          type="radio"
          value="denied"
          id="deny"
        />{' '}
        Deny
      </label>
      <Input
        name="comments"
        label="Comments"
        register={register}
        error={errors.comments}
        type="text"
      />
      <Button
        type="submit"
        appearance="primary"
        label={isLoading ? 'Processing' : 'Submit'}
        disabled={isLoading}
        className={classes.submit}
      />
    </form>
  );
};

export default PendingAbsenceRequest;
