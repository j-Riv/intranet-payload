import type { AfterChangeHook, AfterReadHook } from 'payload/dist/collections/config/types';

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the user manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedUser` field to populate the user data, hidden from the admin UI
export const populateUser: AfterReadHook | AfterChangeHook = async ({ doc, req: { payload } }) => {
  if (doc?.user) {
    const userDoc = await payload.findByID({
      collection: 'users',
      id: typeof doc.user === 'object' ? doc?.user?.id : doc?.user,
      depth: 0,
    });

    doc.populatedUser = {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      department: userDoc.department,
    };

    doc.department = userDoc.department;
  }

  if (doc?.approver) {
    const userDoc = await payload.findByID({
      collection: 'users',
      id: typeof doc.approver === 'object' ? doc?.approver?.id : doc?.approver,
      depth: 0,
    });

    doc.populatedApprover = {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      department: userDoc.department,
    };
  }

  return doc;
};
