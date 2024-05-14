'use server';

import dotenv from 'dotenv';
import formData from 'form-data';
import type { MessagesSendResult } from 'mailgun.js';
import Mailgun from 'mailgun.js';

dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

export const sendEmail = async (args: {
  to: string;
  cc: string[];
  subject: string;
  html: string;
}): Promise<MessagesSendResult> => {
  const { to, cc, subject, html } = args;

  const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'SuaveNet <noreply@mg.suavecito.com> ',
    to,
    cc: cc.join(', '),
    subject,
    html,
  });

  return response;
};
