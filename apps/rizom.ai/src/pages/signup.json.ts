export const prerender = false;
import { z } from 'astro:schema';
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { PUBLIC_RESEND_API_KEY } from "astro:env/server"
import RSVPEmail from "../components/RSVPEmail"

const resend = new Resend(PUBLIC_RESEND_API_KEY);

const newUserSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
})

async function register(newUser: z.infer<typeof newUserSchema>) {
  const { email } = newUser;
  try {

    await resend.emails.send({
      from: 'rsvp@rizom.ai',
      replyTo: "arjannehoogstad@hotmail.com",
      to: email,
      subject: 'Your registration has been confirmed',
      react: RSVPEmail()
    });


    await resend.contacts.create({
      ...newUser,
      audienceId: '5a3b5deb-adc0-484a-ad70-d25ab635516d'
    });

    return {
      success: true,
      message: 'Thank you for registering!'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'Sorry, something went wrong. Please try again.'
    };
  }
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const newUser = newUserSchema.parse(body);
  const response = await register(newUser);

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
