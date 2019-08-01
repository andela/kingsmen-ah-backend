import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import { config } from 'dotenv';

config();

const url = process.env.BASE_URL || 'localhost:3000';
const projectName = process.env.PROJECT_NAME || 'Author\'s Haven';
const projectEmail = process.env.PROJECT_EMAIL || 'authorshaven@gmail.com';
const logo = 'https://imgur.com/UJOr0Jp.png"';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Configure the mail gen
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: projectName,
    link: url,
    logo
  }
});

const sendMail = ({ to, subject, message }) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendVerifyMailToken = (token, email, name) => {
  const emailBody = {
    body: {
      name: `${name.toUpperCase()}`,
      intro: 'Welcome , glad to have you onboard. Please verify your mail to enjoy premium access.',
      action: {
        instructions: 'Click on the button below to verify your mail and start enjoying full access.',
        button: {
          color: '#335BCF',
          text: 'Verify Your Account',
          link: `${url}/auth/activate_user?email=${email}&token=${token}`
        }
      },
      outro: `If that doesn't work, copy and paste the following link in your browser:
      \n\n${url}/auth/activate_user?email=${email}&token=${token}`
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: `${projectName}: Verify Account`,
    message
  });
};

const sendForgotPasswordMail = (token, email, name) => {
  const link = `${url}/auth/reset_password?email=${email}&token=${token}`;
  const emailBody = {
    body: {
      name: `${name.toUpperCase()}`,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: 'Tap the button below to reset your customer account password. If you didn\'t request a new password, you can safely delete this email.',
        button: {
          color: '#335BCF',
          text: 'Reset Your Password',
          link
        }
      },
      outro: `If that doesn't work, copy and paste the following link in your browser:\n\n${link}`
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: `${projectName}: Forgot Password`,
    message
  });
};

const sendResetSuccessMail = (email, name) => {
  const emailBody = {
    body: {
      name: `${name.toUpperCase()}`,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: `Your password has been successfully reset. Please login to ${projectName} by clicking the button below`,
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
    subject: `${projectName}: Reset Success`,
    message
  });
};

export { sendForgotPasswordMail, sendResetSuccessMail, sendVerifyMailToken };
