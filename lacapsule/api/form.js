import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/contact', urlencodedParser, (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.rgpd) {
        return res.status(422).json({ error: 'Désolé, un problème est survenu!' });
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'elisabeth@stereosuper.fr',
            pass: 'bPdO1929'
        }
    });

    transporter.sendMail({
        from: req.body.name + ' <' + req.body.email + '>',
        to: 'elisabethhamel@outlook.com',
        subject: req.body.object + ' - La Capsule',
        text: req.body.message
    });

    return res.status(200).json({ message: 'Message sent!' });
});

// app.post('/ressource', urlencodedParser, (req, res) => {
//     if (!req.body.email) {
//         return res.status(422).json({ error: 'Désolé, un problème est survenu!' });
//     }

//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'elisabeth@stereosuper.fr',
//             pass: 'bPdO1929'
//         }
//     });

//     let error = false;

//     transporter.sendMail(
//         {
//             from: req.body.email,
//             to: 'elisabethhamel@outlook.com',
//             subject: 'Demande de ressource - La Capsule',
//             text: req.body.email + " a demandé l'accès à " + req.body.title
//         },
//         err => {
//             if (err) {
//                 error = err;
//             }
//         }
//     );

//     if (error) {
//         return res.status(404).json({ message: error });
//     } else {
//         return res.status(200).json({ message: 'Message sent!' });
//     }
// });

// export the server middleware
module.exports = {
    path: '/api',
    handler: app
};
