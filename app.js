

const Xbox = require('xbox-on');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const tcpp = require('tcp-ping');

let app = express();
app.use(bodyParser.json());

app.use(express.static('www', {
    index: 'index.html'
}));

app.post('//start', function (req, res) {

    let liveId = req.body.liveId;
    let localIp = req.body.localIp;

    if(!liveId)
        return res.send({ok:false, error: 'no live device id'});
    if(!localIp)
        return res.send({ok:false, error: 'no local ip'});

    let xbox = new Xbox(localIp, liveId);

    let options = {
        tries: 1,
        delay: 1000,
        waitForCallback: true
    };

    xbox.powerOn(options, function (err, result) {
        console.log(err, result);
        if(err) {
            res.send({ok: false, error: err});
        } else {
            res.send({ok: true});
        }
    });

});

app.post('/ping', function (req, res) {

    let localIp = req.body.localIp;

    if(!localIp)
        return res.send({ok:false, error: 'no local ip'});


    tcpp.probe(localIp, 5050, function(err, available) {
        console.log('err', err);
        console.log('avail', available);
    });

    res.send({ok: true});

});




// tcpp.probe('192.168.1.69', 5050, function(err, available) {
//     console.log('err', err);
//     console.log('avail', available);
// });

// tcpp.ping({ address: '192.168.1.69', port: 5050, attempts: 1 }, function(err, data) {
//     console.log(data);
// });

app.listen(config.http_port, function () {
    console.log('XBOX STARTER listening port', config.http_port);
});