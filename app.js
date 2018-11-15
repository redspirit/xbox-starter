

const Xbox = require('xbox-on');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.use(express.static('www', {
    index: 'index.html'
}));

app.put('/start', function (req, res) {

    let liveId = req.body.liveId;
    if(!liveId)
        return res.send({ok:false, error: 'no live device id'});

    let xbox = new Xbox(config.xbox_ip, liveDeviceId);

    let options = {
        tries: 3,
        delay: 1000,
        waitForCallback: false
    };

    xbox.powerOn(options);

    res.send({ok: true});

});



app.listen(config.http_port, function () {
    console.log('XBOX STARTER listening port', config.http_port);
});