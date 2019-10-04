const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const {
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
} = process.env;
const publicVapidKey = PUBLIC_VAPID_KEY;
const privateVapidKey = PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:tmorozov@lohika.com', publicVapidKey, privateVapidKey);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')))
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log('got subscription', subscription);
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'Push Test'});
    console.log('sending push', payload);
    webpush.sendNotification(subscription, payload).catch(console.error);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`started at ${PORT}`))