import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import { config } from 'dotenv';

config();

const url = process.env.BASE_URL || 'https://kingsmen-ah-frontend-staging.herokuapp.com';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure the mail gen
const mailGenerator = new Mailgen({
  theme: 'cerberus',
  product: {
    name: 'Author\'s Haven',
    link: url
  }
});

const sendMail = ({ to, subject, message }) => {
  const mailOptions = {
    from: '"Author\'s Haven" <authorshaven@gmail.com>',
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendForgotPasswordMail = (token, email, name) => {
  const emailBody = {
    body: {
      name,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: 'Tap the button below to reset your customer account password. If you didn\'t request a new password, you can safely delete this email.',
        button: {
          color: '#1a82e2',
          text: 'Reset Your Password',
          link: `${url}/auth/reset_password`
        }
      },
      outro: `If that doesn't work, copy and paste the following link in your browser:\n\n${url}/auth/reset_password`
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: "Author's Haven: Forgot Password",
    message
  });
};

const sendResetSuccessMail = (email, name) => {
  const emailBody = {
    body: {
      name,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: 'Your password has been successfully reset. Please login to Author\'s Haven by clicking the button below',
        button: {
          color: 'green',
          text: 'Login',
          link: `${url}/login`
        }
      }
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: "Author's Haven: Reset Success",
    message
  });
};

export { sendForgotPasswordMail, sendResetSuccessMail };
