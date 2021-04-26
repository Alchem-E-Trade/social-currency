const { Router } = require('express');

module.exports =  Router()
.post(`${process.env.HEROKU_URL}/slack/events`, async (req,res,next) => {
    try{
        const challenge = req.body.challenge;
        res.send(`HTTP 200 OK
        Content-type: text/plain
        ${challenge}`);
    } catch(error){
        console.log(error);
    }
});
