const express = require('express');
const path = require('path');
const app = express();


app.enable('trust proxy');

app.use('*', function(req, res, next) {
    if(req.secure) {
      next();
    } else {
        return res.redirect( 301, "https://" + req.headers.host + req.url);
    }
})

app.use(express.static(path.join(__dirname + '/dist/totem-gdn-layout')));
app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname + '/dist/totem-gdn-layout/index.html'));

});


app.listen(process.env.PORT || 3000);