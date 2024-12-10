import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { PUBLIC_RESEND_API_KEY } from "astro:env/server"
import RSVPEmail from "../components/RSVPEmail"


const resend = new Resend(PUBLIC_RESEND_API_KEY);


export const server = {
  rsvp: defineAction({
    accept: 'form',
    input: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string()
    }),
    handler: async (args) => {
      const { email } = args;
      try {

        await resend.emails.send({
          from: 'rsvp@rizom.ai',
          replyTo: "arjannehoogstad@hotmail.com",
          to: email,
          subject: 'Your registration has been confirmed',
          react: RSVPEmail()
        });


        await resend.contacts.create({
          ...args,
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
  })
}
