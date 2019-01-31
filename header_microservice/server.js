const express = require("express");
const app = express();

// express grabs header information and feeds in back in json format to user
app.get('/api', (req, res) => {
    let headerInfo = req.headers;
    let userAgent = headerInfo["user-agent"];
    let language = headerInfo["accept-language"];
    let ip = headerInfo["x-forwarded-for"];
    res.json({userAgent, language, ip});
});

app.listen(3000);