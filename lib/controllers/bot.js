const { Router } = require('express');

module.exports =  Router()
.post(`${process.env.HEROKU_URL}/slack/events`, async (req,res,next) => {
    try{
        const challenge = req.body.challenge;
        console.log(req);
//         res.send(`HTTP 200 OK
// Content-type: text/plain
// ${challenge}`);
res.send(res.setStatus(200), res.setContentType('text/plain'), res.getStreamWriter().writeString(req.body.data.challenge));
    } catch(error){
        console.log(error);
    }
});
