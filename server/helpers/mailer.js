import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import { config } from 'dotenv';

config();

const url = process.env.UI_HOST_NAME || 'https://kingsmen-ah-frontend-staging.herokuapp.com';
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

const sendVerifyMailToken = (token, email, name) => {
  const emailBody = {
    body: {
      name,
      intro: `Welcome ${name}, glad to have you onboard. Please verify your mail to enjoy premium access.`,
      action: {
        instructions: 'Click on the button below to verify your mail and start enjoying full access.',
        button: {
          color: '#1a82e2',
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
    subject: 'Author\'s Haven: Verify email',
    message
  });
};

export default sendVerifyMailToken;
