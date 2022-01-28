const express = require('express');
const app = express();
var axios = require('axios');
const https = require('https');


// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

app.get('/data',(req,res) => {

axios.get('https://v2.jokeapi.dev/joke/Any',{ httpsAgent: agent })
.then(response => {
    const first = response.data.setup;

    const second = response.data.delivery;

    res.setHeader("Content-Type", "text/html")
    res.write("<h1>" + first + "</h1>");
    res.write("<h2>" + second + "</h2>");
    return res.send();

   
    // return res.send('<h1> HEllo !!!!!!!!!!!!!!</h1>');
})
.catch(error => {
    console.log(error);
});


});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Listening on Port 3000");
});