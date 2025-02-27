import type { FunctionComponent } from 'react';

interface WelcomeEmailProps {
  username: string;
  rizomEmail: string;
  password: string;
}

export const WelcomeEmail: FunctionComponent<WelcomeEmailProps> = ({
  username,
  rizomEmail,
  password,
}) => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
    }}>
      <h1 style={{ color: '#2C3E50', marginBottom: '25px' }}>Welcome to Rizom! 🎉</h1>

      <p style={{ fontSize: '16px', lineHeight: 1.5 }}>Hi {username},</p>
      <p style={{ fontSize: '16px', lineHeight: 1.5 }}>
        We're excited to have you join Rizom! Your accounts have been created and are ready to use.
        Here's everything you need to get started:
      </p>

      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        margin: '25px 0',
      }}>
        <h2 style={{ color: '#2C3E50', marginTop: 0 }}>Your Account Details</h2>
        <p style={{ margin: '10px 0' }}>
          <strong>Email:</strong> {rizomEmail}<br />
          <strong>Matrix Username:</strong> {username}<br />
          <strong>Initial Password:</strong> {password}
        </p>
      </div>

      <div style={{ margin: '30px 0' }}>
        <h2 style={{ color: '#2C3E50' }}>Quick Start Guide</h2>

        <div style={{ margin: '20px 0' }}>
          <h3 style={{ color: '#34495E' }}>📧 Setting Up Your Email</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ margin: '10px 0' }}>
              Visit <a href="https://webmail.migadu.com" style={{ color: '#3498DB' }}>
                webmail.migadu.com
              </a>
            </li>
            <li style={{ margin: '10px 0' }}>
              Sign in using your Rizom email and password (no 2FA required)
            </li>
          </ol>
        </div>

        <div style={{ margin: '20px 0' }}>
          <h3 style={{ color: '#34495E' }}>💬 Setting Up Matrix Chat</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ margin: '10px 0' }}>
              Download Element from <a href="https://element.io/download" style={{ color: '#3498DB' }}>
                element.io/download
              </a>
            </li>
            <li style={{ margin: '10px 0' }}>Launch Element and click "Sign In"</li>
            <li style={{ margin: '10px 0' }}>Select "Change homeserver"</li>
            <li style={{ margin: '10px 0' }}>
              Enter: <code style={{
                background: '#F0F0F0',
                padding: '2px 5px',
                borderRadius: '3px',
              }}>
                https://matrix.rizom.ai
              </code>
            </li>
            <li style={{ margin: '10px 0' }}>
              Sign in with your Matrix username and password
            </li>
            <li style={{ margin: '10px 0' }}>
              Join our Rizom space by clicking this link once logged in:{' '}
              <a href="https://matrix.to/#/#rizom:rizom.ai" style={{ color: '#3498DB' }}>
                #rizom:rizom.ai
              </a>
            </li>
          </ol>
        </div>
      </div>

      <div style={{
        backgroundColor: '#F0F7FF',
        padding: '20px',
        borderRadius: '8px',
        margin: '25px 0',
      }}>
        <h3 style={{ color: '#2C3E50', marginTop: 0 }}>Need Help?</h3>
        <p style={{ marginBottom: 0 }}>
          We're here to support you! If you have any questions or run into any issues,
          simply reply to this email. Our team will be happy to assist you.
        </p>
      </div>

      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #E0E0E0',
        fontSize: '14px',
        color: '#666',
      }}>
        <p>
          Best regards,<br />
          The Rizom Team
        </p>
      </div>
    </div>
  );
};
