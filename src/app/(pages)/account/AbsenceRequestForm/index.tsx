'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { AbsenceRequest } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { DatePicker } from '../../../_components/DatePicker';
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
            _status: 'published',
            title: `Absence Request: ${user.name} - ${moment(data.startDate).format(
              'MM-DD-YYYY',
            )} to ${moment(data.endDate).format('MM-DD-YYYY')}`,
            user: user.id,
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
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      <Input
        name="username"
        label="Name"
        // required
        register={register}
        error={errors.username}
        type="text"
        defaultValue={userName}
        readOnly
      />
      <Input
        name="email"
        label="Email Address"
        // required
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
  );
};

export default AbsenceRequestForm;
