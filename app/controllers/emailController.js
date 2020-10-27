require('dotenv-expand').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendVerificationEmail(to, token, userFullName) {
    const msg = {
      to,
      from: 'test@mydomain.com',
      subject: 'Activate your email',
      html: `
      <p>
      Hello ${userFullName}, <br/>
      Click on this link to verify your email <strong>${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3333'
          : 'https://thegabriel.dev/apps/snippetfy'
      }/verification?token=${token}&email=${to}</strong><br/>
      </p>`
    }
    sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.log(error)
    })
  }
};
