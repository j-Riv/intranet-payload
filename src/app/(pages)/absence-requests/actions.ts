'use server';

import { revalidatePath } from 'next/cache';

// TODO: fix this function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function revalidate(email: string): Promise<void> {
  revalidatePath('/absence-requests/pending');
}
