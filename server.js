const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');
dotenv.config();
const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/email', (req, res) => {
    const { email, subject, message } = req.body;
    mailgun().messages().send({
        // from: `John Doe <john@mg@mdomain.com>`,
        // to: `${email}`,
        from: `${email}`,
        to: `Dan C <daniacaptan@gmail.com>`,
        subject: `${subject}`,
        html: `<p>${message}</p>`
    },
        (error, body) => {
            if (error) {
                console.log(error);
                res.status(500).send({ message: 'Error sending ouf email' })
            } else {
                console.log(body);
                res.send({ message: 'Email sent successfully' });
            }
        });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})