import type { Department } from '../../payload/payload-types';

export const matchDepartment = (departments: Department[], id: number): string => {
  return departments.find(department => department.id === id)?.name;
};
