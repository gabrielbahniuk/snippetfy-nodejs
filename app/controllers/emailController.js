require('dotenv').config();
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports = {
  sendVerificationEmail(to, token) {
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            subject: 'Activate Your Email'
          }
        ],
        from: {
          email: 'noreply@snippetfy-app.herokuapp.com'
        },
        content: [
          {
            type: 'text/html',
            value: `
            <p>
            Hello, <br/>
            Click on this link to verify your email <strong>${
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://snippetfy-app.herokuapp.com'
            }/verification?token=${token}&email=${to}</strong><br/>
            </p>

            `
          }
        ]
      }
    });
    return new Promise(function(resolve, reject) {
      sg.API(request, function(error, response) {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }
};
