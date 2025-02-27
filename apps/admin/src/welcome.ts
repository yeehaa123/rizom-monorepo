import { Resend } from 'resend';

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
    from: 'welcome@rizom.ai',
    to: personalEmail,
    subject: 'Welcome to Rizom! Your Account is Ready',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h1 style="color: #2C3E50; margin-bottom: 25px;">Welcome to Rizom!</h1>
        
        <p style="font-size: 16px; line-height: 1.5;">Hi ${username},</p>
        <p style="font-size: 16px; line-height: 1.5;">We're excited to have you join Rizom! Your accounts have been created and are ready to use. Here's everything you need to get started:</p>
        
        <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h2 style="color: #2C3E50; margin-top: 0;">Your Account Details</h2>
          <p style="margin: 10px 0;">
            <strong>Email:</strong> ${rizomEmail}<br>
            <strong>Matrix Username:</strong> ${username}<br>
            <strong>Initial Password:</strong> ${password}
          </p>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #2C3E50;">Quick Start Guide</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #34495E;">📧 Setting Up Your Email</h3>
            <ol style="padding-left: 20px;">
              <li style="margin: 10px 0;">Visit <a href="https://webmail.migadu.com" style="color: #3498DB;">webmail.migadu.com</a></li>
              <li style="margin: 10px 0;">Sign in using your Rizom email and password</li>
            </ol>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #34495E;">💬 Setting Up Matrix Chat</h3>
            <ol style="padding-left: 20px;">
              <li style="margin: 10px 0;">Download Element from <a href="https://element.io/download" style="color: #3498DB;">element.io/download</a></li>
              <li style="margin: 10px 0;">Launch Element and click "Sign In"</li>
              <li style="margin: 10px 0;">Select "Change homeserver"</li>
              <li style="margin: 10px 0;">Enter: <code style="background: #F0F0F0; padding: 2px 5px; border-radius: 3px;">https://matrix.rizom.ai</code></li>
              <li style="margin: 10px 0;">Sign in with your Matrix username and password</li>
            </ol>
          </div>
        </div>

        <div style="background-color: #F0F7FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #2C3E50; margin-top: 0;">Need Help?</h3>
          <p style="margin-bottom: 0;">We're here to support you! If you have any questions or run into any issues, simply reply to this email. Our team will be happy to assist you.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E0E0E0; font-size: 14px; color: #666;">
          <p>Best regards,<br>The Rizom Team</p>
        </div>
      </div>
    `,
  });
}
