'use server';

import { revalidatePath } from 'next/cache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function navigate(email: string): Promise<void> {
  revalidatePath('/absence-requests/pending');
}
