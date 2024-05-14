import type { BeforeChangeHook } from 'payload/dist/collections/config/types';

export const populateDepartment: BeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (data?.user) {
      const userDoc = await req.payload.findByID({
        collection: 'users',
        id: typeof data.user === 'object' ? data?.user?.id : data?.user,
        depth: 0,
      });

      data.department = userDoc.department;
    }
  }

  return data;
};
