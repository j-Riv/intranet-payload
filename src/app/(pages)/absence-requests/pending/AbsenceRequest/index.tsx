'use client';
import React, { Fragment, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AbsenceRequest } from '../../../../../payload/payload-types';
import { Button } from '../../../../_components/Button';
import { DatePicker } from '../../../../_components/DatePicker';
import { Gutter } from '../../../../_components/Gutter';
import { Input } from '../../../../_components/Input';
import { Message } from '../../../../_components/Message';
import { useAuth } from '../../../../_providers/Auth';
import { navigate } from '../../actions';

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
};

const AbsenceRequest: React.FC<Props> = ({ absenceRequest }) => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const redirect = useRef(searchParams.get('redirect'));
  const router = useRouter();
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
            }),
          },
        );

        const json: AbsenceRequest & {
          message?: string;
        } = await res.json();

        if (!res.ok) throw new Error(json.message);

        setError(null);

        setSuccess(<Fragment>{'Absence request was submitted successfully.'}</Fragment>);

        navigate(data.email);

        // reset()
        // revalidatePath('/absence-requests/pending')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.');
      }
    },
    [user, id],
  );

  return (
    <Gutter>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.absenceRequestForm}>
        <Message error={error} success={success} className={classes.message} />
        <p>{JSON.stringify(absenceRequest)}</p>
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
            defaultValue={dateFrom}
            readOnly
          />
          <Input
            name="endDate"
            label="End Date"
            required
            register={register}
            error={errors.endDate}
            type="text"
            defaultValue={dateTo}
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
        <Button
          type="submit"
          appearance="primary"
          label={isLoading ? 'Processing' : 'Submit'}
          disabled={isLoading}
          className={classes.submit}
        />
      </form>
    </Gutter>
  );
};

export default AbsenceRequest;
