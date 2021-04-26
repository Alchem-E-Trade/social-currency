// const { Router } = require('express');


// module.exports =  Router()
// .post(`${process.env.HEROKU_URL}/slack/events`, async (req,res,next) => {

//     try{
//         const challenge = req.body.challenge;
//         console.log(req);
//         res.send(`POST / HTTP 200 OK
// Content-type: text/plain
// ${challenge}`);
// // res.send(res.setStatus(200), res.setContentType('text/plain'), res.getStreamWriter().writeString(req.body.data.challenge));
//     } catch(error){
//         console.log(error);
//     }
// });


// =======
// module.exports =  Router()
// .post(`${process.env.HEROKU_URL}/slack/events`, async (req,res,next) => {
    //   try{
        //     const challenge = req.body.challenge;
        //     res.send(`HTTP 200 OK
        // Content-type: text/plain
        // ${challenge}`);
        //   } catch(error){
            //         console.log(error);
            //    }
            // >>>>>>> 4dd8b635941049ac43a2c9601d306af2e214aac5
        // });
        
        // fetch(`${process.env.HEROKU_URL}/slack/events`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         challenge: challenge
        //     })
