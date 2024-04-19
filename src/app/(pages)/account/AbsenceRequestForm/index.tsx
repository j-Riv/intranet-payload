'use client';

import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { AbsenceRequest } from '../../../../payload/payload-types';
import { Button } from '../../../_components/Button';
import { DatePicker } from '../../../_components/DatePicker';
import { Input } from '../../../_components/Input';
import { Message } from '../../../_components/Message';
import { useAuth } from '../../../_providers/Auth';
import { sendEmail } from '../../../_utilities/sendEmail';

import classes from './index.module.scss';

type FormData = {
  username: string;
  email: string;
  startDate: string;
  endDate: string;
  reason: string;
};

type Day = {
  date?: string;
  id?: string;
};

type Props = {
  blackOutDays: Day[];
  paidHolidays: Day[];
};

const AbsenceRequestForm: React.FC<Props> = ({ blackOutDays, paidHolidays }) => {
  const { user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<React.ReactNode | null>(null);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const excludedDates = useMemo(() => {
    const holidays = paidHolidays.map(holiday => new Date(holiday.date));
    const blackOuts = blackOutDays.map(blackOut => new Date(blackOut.date));
    return [...holidays, ...blackOuts];
  }, [blackOutDays, paidHolidays]);

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

      // compare dates
      const date1 = new Date(data.startDate).getTime();
      const date2 = new Date(data.endDate).getTime();

      try {
        if (date1 > date2) {
          throw new Error('End date must be after start date');
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/absence-requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _status: 'published',
            title: `${user.name} - OFF | ${moment(data.startDate).format('MM-DD-YYYY')} to ${moment(
              data.endDate,
            ).format('MM-DD-YYYY')}`,
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

        setSuccess(<Fragment>{'Your absence request was submitted successfully.'}</Fragment>);
        // send email on success
        const dF = moment(data.startDate).format('MM-DD-YYYY');
        const dT = moment(data.endDate).format('MM-DD-YYYY');
        // @ts-ignore
        const departmentManagerEmail = user.department?.manager?.email;
        // @ts-ignore
        const departmentName = user.department?.name;
        const args = {
          to: user.email,
          cc: [departmentManagerEmail],
          subject: `Absence Request Submitted for ${user.name}`,
          html: `
            <p style="margin-bottom: 20px;">This is an automated message, please do not reply.</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Department:</strong> ${departmentName}</p>
            <p><strong>Type of Absence:</strong> Vacation</p>
            <p><strong>Absence Dates:</strong> ${dF} - ${dT}</p>
            <p><strong>Reason:</strong> ${data.reason}</p>
          `,
        };

        const emailResponse = await sendEmail(args);

        reset();
      } catch (err: any) {
        let message = 'There was an error. Please try again.';
        if (err.message === 'End date must be after start date') {
          message = 'End date must be after start date';
        }

        setError(message);
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
          excludedDates={excludedDates}
        />
        <DatePicker
          control={control}
          name="endDate"
          label="End Date"
          placeholder="Select Date"
          required={true}
          error={errors.endDate}
          excludedDates={excludedDates}
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
