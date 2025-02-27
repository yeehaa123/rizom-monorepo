import { Resend } from 'resend';
import { WelcomeEmail } from './WelcomeEmail';

export async function sendWelcomeEmail({
  personalEmail,
  rizomEmail,
  username,
  password,
}: {
  personalEmail: string;
  rizomEmail: string;
  username: string;
  password: string;
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  await resend.emails.send({
    from: 'yeehaa@rizom.ai',
    to: personalEmail,
    subject: 'Welcome to Rizom! Your Account is Ready',
    react: await WelcomeEmail({ username, rizomEmail, password }),
  });
}

export async function createMailbox(username: string, password: string, apiKey: string): Promise<Response> {
  const response = await fetch(`https://api.migadu.com/v1/domains/rizom.ai/mailboxes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`yeehaa@offcourse.io:${apiKey}`).toString('base64')}`


    },
    body: JSON.stringify({
      local_part: username,
      password: password,
      password_method: 'plain',
      name: username,  // Add this
      address_type: 'custom'  // Add this
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Migadu API error: ${JSON.stringify(error)}`);
  }

  return response;
}

export async function deleteMailbox(username: string, apiKey: string): Promise<Response> {
  const response = await fetch(`https://api.migadu.com/v1/domains/rizom.ai/mailboxes/${username}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${Buffer.from(`yeehaa@offcourse.io:${apiKey}`).toString('base64')}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`Migadu API error: ${JSON.stringify(error)}`);
  }

  return response;
}
