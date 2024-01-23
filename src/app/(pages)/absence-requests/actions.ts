'use server'

import { revalidatePath } from 'next/cache'

export async function navigate(email: string): Promise<void> {
  console.log('email', email)
  revalidatePath('/absence-requests/pending')
}
