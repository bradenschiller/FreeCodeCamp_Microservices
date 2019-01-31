const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/timestamp/:date', (req, res) => {
    let date = req.params.date;
    
    let dateFormattingOption = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    if(isNaN(date)){
        var naturalDate = new Date(date);
        naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOption);
        var unixdate = new Date(naturalDate).getTime()/1000;
    } else {
        var unixdate = date;
        var naturalDate = new Date(date * 1000);
        naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOption)
    }

   res.render(__dirname + "/public/index", {unixdate: unixdate, naturalDate: naturalDate})
})

app.listen(3000);
