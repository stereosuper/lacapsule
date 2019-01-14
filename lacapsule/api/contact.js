import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);

    // if (!req.body['email']) {
    //     // Throw a 422 with a neat error message if validation failed
    //     return res.status(422).json({ 'error': 'Ugh.. Something went wrong!' })
    // }

    // const transporter = nodemailer.createTransport({
    //     sendmail: true,
    //     newline: 'unix',
    //     path: '/usr/sbin/sendmail'
    // });

    // transporter.sendMail({
    //     from: req.body['email'],
    //     to: 'elisabeth@stereosuper.fr',
    //     subject: 'Demande de ressource - La Capsule',
    //     email: req.body['email']
    // });

    // res.status(200).json({ 'message': 'Message sent!' });
});

// export the server middleware
module.exports = {
    path: '/api/contact',
    handler: app
};
