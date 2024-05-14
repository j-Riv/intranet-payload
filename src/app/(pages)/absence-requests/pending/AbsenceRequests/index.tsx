'use client';

import React, { useEffect, useState } from 'react';

import {
  AbsenceRequest as AbsenceRequestType,
  Department,
} from '../../../../../payload/payload-types';
import { fetchAbsenceRequests } from '../../../../_api/fetchAbsenceRequests';
import PendingAbsenceRequest from '../AbsenceRequest';

type Props = {
  absenceRequests: AbsenceRequestType[];
  defaultDepartment: string;
  departments: Department[];
};

const AbsenceRequests: React.FC<Props> = ({ absenceRequests, defaultDepartment, departments }) => {
  const [department, setDepartment] = useState(defaultDepartment);
  const [data, setData] = useState<AbsenceRequestType[]>([]);

  const getAbsenceRequests = async (dep: string) => {
    let requests: AbsenceRequestType[] | null = null;
    try {
      if (dep === 'all') {
        requests = await fetchAbsenceRequests('absence-requests', {
          status: 'pending',
        });
      } else {
        requests = await fetchAbsenceRequests('absence-requests-by-department', {
          status: 'pending',
          department: { id: Number(dep) } as Department,
        });
      }
      setDepartment(dep);
      setData(requests);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    setData(absenceRequests);
  }, [absenceRequests]);

  return (
    <React.Fragment>
      <label htmlFor="user">Department: </label>
      <select value={department} onChange={e => getAbsenceRequests(e.target.value)}>
        <option value="all">All</option>
        {departments.map(department => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <p>Pending Absence Requests: {data.length}</p>
      {data.map(absenceRequest => (
        <PendingAbsenceRequest key={absenceRequest.id} absenceRequest={absenceRequest} />
      ))}
    </React.Fragment>
  );
};

export default AbsenceRequests;
