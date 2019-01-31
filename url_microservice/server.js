const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");
const database = require("./keys");
const app = express();

// connect to database
mongoose.connect(database);

app.use(bodyParser.json());
app.use(cors());

// creates the database entry
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    let { urlToShorten } = req.params;
    let randomNumber = Math.floor(Math.random()*100000).toString();
    console.log(randomNumber)
    
    let data = new shortUrl({
        originalUrl: urlToShorten,
        shorterUrl: randomNumber
    });

    data.save(err=>{
        if(err){
            return res.send('error saving to database');
        } 
    });

    return res.json(data);
})

// query db and forward to original url
app.get('/:urlToForward', (req, res, next) => {
    let { shorterUrl } = req.params;
    shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
        if(err){
            return res.send("error reading database");
        } else {
            res.redirect(data.originalUrl)
        }
    })

});


// local host is working process is for if on Heroku
app.listen(process.env.PORT || 3000, () => console.log("everything is working"));