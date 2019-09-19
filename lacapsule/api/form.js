import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/contact', urlencodedParser, (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.rgpd) {
        return res.status(422).json({ error: 'Désolé, un problème est survenu!' });
    }

    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'elisabeth@stereosuper.fr',
    //         pass: 'bPdO1929'
    //     }
    // });

    const transporter = nodemailer.createTransport({
        host: 'smtp-stereosuper.alwaysdata.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'stereosuper@alwaysdata.net', // generated ethereal user
            pass: 'bPdO1929' // generated ethereal password
        }
    });

    let object = req.body.object;
    let error = false;
    object = object ? ' - ' + object : '';

    transporter.sendMail(
        {
            from: req.body.name + ' <' + req.body.email + '>',
            to: 'contact@lacapsule.co',
            subject: 'Message du site La Capsule ' + object,
            text: req.body.message
        },
        err => {
            if (err) {
                error = err;
            }
        }
    );

    if (error) {
        return res.status(422).json({ message: error });
    } else {
        return res.status(200).json({ message: 'Message sent!' });
    }
});

app.post('/ressource', urlencodedParser, (req, res) => {
    if (!req.body.email || !req.body.rgpd) {
        return res.status(422).json({ error: 'Désolé, un problème est survenu!' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp-stereosuper.alwaysdata.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'stereosuper@alwaysdata.net', // generated ethereal user
            pass: 'bPdO1929' // generated ethereal password
        }
    });

    let error = false;

    transporter.sendMail(
        {
            from: req.body.email,
            to: 'contact@lacapsule.co',
            subject: 'Demande de ressource - La Capsule',
            text: req.body.email + " a demandé l'accès à " + req.body.title
        },
        err => {
            if (err) {
                error = err;
            }
        }
    );

    if (error) {
        return res.status(404).json({ message: error });
    } else {
        return res.status(200).json({ message: 'Message sent!' });
    }
});

// export the server middleware
module.exports = {
    path: '/api',
    handler: app
};
