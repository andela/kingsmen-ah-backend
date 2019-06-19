import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';
import resetPasswordTemplate from './emailTemplates/sendToken';
import passwordResetSuccessTemplate from './emailTemplates/sendSuccess';

config();

const url = process.env.BASE_URL || 'https://kingsmen-ah-frontend-staging.herokuapp.com';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ to, subject, message }) => {
  const mailOptions = {
    from: '"Author\'s Haven" <authorshaven@gmail.com>',
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendForgotPasswordMail = (token, email) => {
  const mailTitle = 'Reset Your Password';
  const buttonText = 'Reset Your Password';
  const instructionLbl = "Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.";
  const alternativeLbl = 'If that doesn\'t work, copy and paste the following link in your browser:';
  const footer = 'You received this email because we received a request for resetting your account password. If you didn\'t request this action, you can safely delete this email.';

  const message = resetPasswordTemplate(
    `${url}/auth/reset_password`,
    token,
    email,
    mailTitle,
    buttonText,
    instructionLbl,
    alternativeLbl,
    footer
  );
  return sendMail({
    to: email,
    subject: "Author's Haven: Forgot Password",
    message
  });
};

const sendResetSuccessMail = (email) => {
  const mailTitle = 'Password Reset Successful';
  const buttonText = 'Login';
  const instructionLbl = 'Your password has been successfully reset. Please login to Author\'s Haven by clicking the button below';
  const footer = 'You received this email because you successfully reset your password.';

  const message = passwordResetSuccessTemplate(`${url}/login`, mailTitle, buttonText, instructionLbl, footer);

  return sendMail({
    to: email,
    subject: "Author's Haven: Reset Success",
    message
  });
};

export { sendForgotPasswordMail, sendResetSuccessMail };
