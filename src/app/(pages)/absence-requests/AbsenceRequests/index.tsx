'use client';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { AbsenceRequest, User } from '../../../../payload/payload-types';
import { fetchAbsenceRequests } from '../../../_api/fetchAbsenceRequests';
import { getTotalDays } from '../../../_utilities/getTotalDays';

import classes from './index.module.scss';

const months = [
  {
    name: 'All',
    value: 0,
  },
  {
    name: 'January',
    value: 1,
  },
  {
    name: 'February',
    value: 2,
  },
  {
    name: 'March',
    value: 3,
  },
  {
    name: 'April',
    value: 4,
  },
  {
    name: 'May',
    value: 5,
  },
  {
    name: 'June',
    value: 6,
  },
  {
    name: 'July',
    value: 7,
  },
  {
    name: 'August',
    value: 8,
  },
  {
    name: 'September',
    value: 9,
  },
  {
    name: 'October',
    value: 10,
  },
  {
    name: 'November',
    value: 11,
  },
  {
    name: 'December',
    value: 12,
  },
];

type AbsenceRequestProps = {
  absenceRequest: AbsenceRequest;
  odd: boolean;
};

const AbsenceRequest: React.FC<AbsenceRequestProps> = ({ absenceRequest, odd }) => {
  const { dateFrom, dateTo, userComments, populatedUser, type, populatedApprover, adminComments } =
    absenceRequest;

  return (
    <React.Fragment>
      <tr className={odd ? classes.odd : ''}>
        <td>{populatedUser.name}</td>
        <td>{populatedUser.department}</td>
        <td>{type}</td>
        <td>{moment(dateFrom).format('MM-DD-YYYY')}</td>
        <td>{moment(dateTo).format('MM-DD-YYYY')}</td>
        <td>
          {getTotalDays(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))}
        </td>
        <td>{populatedApprover.name}</td>
      </tr>
      <tr className={odd ? classes.odd : ''}>
        <td colSpan={7}>User Comments: {userComments}</td>
      </tr>
      <tr className={odd ? classes.odd : ''}>
        <td colSpan={7}>Manager Comments: {adminComments}</td>
      </tr>
    </React.Fragment>
  );
};

type ListProps = {
  absenceRequests: AbsenceRequest[];
  users: User[];
};

const List: React.FC<ListProps> = ({ absenceRequests, users }) => {
  const [data, setData] = useState<AbsenceRequest[]>(absenceRequests);

  const [month, setMonth] = useState<number>(0);
  const [user, setUser] = useState<string>('all');

  const getAbsenceRequests = async (m: number, u?: string) => {
    let absenceRequests: AbsenceRequest[] | null = null;

    try {
      if (m !== 0) {
        const date = new Date(`${m}/01/${new Date().getFullYear()}`);
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
        if (u && u !== 'all') {
          absenceRequests = await fetchAbsenceRequests('absence-requests-by-month-user', {
            status: 'approved',
            firstDay: firstDay,
            lastDay: lastDay,
            user: Number(u),
          });
        } else {
          absenceRequests = await fetchAbsenceRequests('absence-requests-by-month', {
            status: 'approved',
            firstDay: firstDay,
            lastDay: lastDay,
          });
        }
      } else {
        if (u && u !== 'all') {
          absenceRequests = await fetchAbsenceRequests('absence-requests-by-user', {
            status: 'approved',
            user: Number(u),
          });
        } else {
          absenceRequests = await fetchAbsenceRequests('absence-requests', {
            status: 'approved',
          });
        }
      }
      setData(absenceRequests);
      setMonth(m);

      if (u) {
        setUser(u);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <div>
      <label htmlFor="month">Month: </label>
      <select value={month} onChange={e => getAbsenceRequests(Number(e.target.value))}>
        {months.map(month => (
          <option key={month.name} value={month.value}>
            {month.name}
          </option>
        ))}
      </select>

      <label htmlFor="user">User: </label>
      <select value={user} onChange={e => getAbsenceRequests(month, e.target.value)}>
        <option value="all">All</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Approved By</th>
          </tr>
        </thead>
        <tbody>
          {data.map((absenceRequest, i) => (
            <AbsenceRequest
              key={absenceRequest.id}
              absenceRequest={absenceRequest}
              odd={i % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
