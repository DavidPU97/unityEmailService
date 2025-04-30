const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Email POST endpoint
app.post('/sendemail', async (req, res) => {
    const { name, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'david.pu1997@gmail.com',
            pass: 'tkewsggjttsixasd' // Use App Password, not real password
        }
    });

    const mailOptions = {
        from: 'david.pu1997@gmail.com',
        to: 'david.pu97@gmail.com',
        subject: `Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ status: 'ok', message: 'Email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Email server running at http://localhost:${port}`);
});
