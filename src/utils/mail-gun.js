const formData = require('form-data');
const Mailgun = require('mailgun-js');
const API_KEY = '6c51a0b9f5aad1a74238dc860afb637d-6b161b0a-8ccd82b1';
const DOMAIN = 'sandbox40f2d8c501254b28a0a2d543c5852b79.mailgun.org';

const mailgunClient = new Mailgun(formData);
const mg = mailgunClient.client({
	username: 'api',
    apiKey: API_KEY,
});


const mailgunSendCorreo = (body) => {
    const bodyMessage = { from, to, subject, text } = body;
    mg.messages
        .create(DOMAIN,
            bodyMessage)
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error`;
    
}

module.exports = {
    mailgunSendCorreo
}

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.