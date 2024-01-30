'use client';

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AbsenceRequest } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { DatePicker } from '../../../_components/DatePicker';
import { Gutter } from '../../../_components/Gutter';
import { Input } from '../../../_components/Input';
import { Message } from '../../../_components/Message';
import { useAuth } from '../../../_providers/Auth';

import classes from './index.module.scss';

type FormData = {
  username: string;
  email: string;
  startDate: string;
  endDate: string;
  reason: string;
};

const AbsenceRequestForm: React.FC = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const redirect = useRef(searchParams.get('redirect'));
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<React.ReactNode | null>(null);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!user) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/absence-requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // All comments are created as drafts so that they can be moderated before being published
            // Navigate to the admin dashboard and change the comment status to "published" for it to appear on the site
            // status: 'draft',
            title: `Absence Request:  ${user.name}`,
            author: user.id,
            dateFrom: new Date(data.startDate).toISOString(),
            dateTo: new Date(data.endDate).toISOString(),
            // dateFrom: startDate,
            // dateTo: endDate,
            userComments: data.reason,
            categories: [2],
            // ...data,
          }),
        });

        const json: AbsenceRequest & {
          message?: string;
        } = await res.json();

        if (!res.ok) throw new Error(json.message);

        setError(null);

        setSuccess(
          <Fragment>{'Your absence request was submitted successfully. To approve it, '}</Fragment>,
        );

        reset();
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.');
      }
    },
    [user, reset],
  );

  useEffect(() => {
    setUserName(user?.name);
    setUserEmail(user?.email);
  }, [user]);

  return (
    <Gutter>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.absenceRequestForm}>
        <p>{`Fill out the form below to submit an absence request.`}</p>
        <Message error={error} success={success} className={classes.message} />
        <Input
          name="username"
          label="Name"
          required
          register={register}
          error={errors.username}
          type="text"
          defaultValue={userName}
          readOnly
        />
        <Input
          name="email"
          label="Email Address"
          required
          register={register}
          error={errors.email}
          type="email"
          defaultValue={userEmail}
          readOnly
        />
        <div className={classes.dateContainer}>
          <DatePicker
            control={control}
            name="startDate"
            label="Start Date"
            placeholder="Select Date"
            required={true}
            error={errors.startDate}
          />
          <DatePicker
            control={control}
            name="endDate"
            label="End Date"
            placeholder="Select Date"
            required={true}
            error={errors.endDate}
          />
        </div>
        <Input name="reason" label="Reason" register={register} error={errors.reason} />
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

export default AbsenceRequestForm;
