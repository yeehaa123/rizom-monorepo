import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { RESEND_API_KEY } from "astro:env/server"


const resend = new Resend(RESEND_API_KEY);

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

        const x = await resend.emails.send({
          from: 'test@rizom.ai',
          to: email,
          subject: 'Welcome to our newsletter!',
          text: 'Thank you for subscribing to our newsletter!'
        });

        console.log(x);

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
