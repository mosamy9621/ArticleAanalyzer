const path = require('path')
const express = require('express')
// requirng body-parser to get data from post request as json object
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
// getting data from .enf file
const dotenv = require('dotenv');
dotenv.config();
// instantiating CORS middleware (i need it in development enviroment because the clinet runs on different server) 
const cors = require('cors');
// instantiating axios to perform post request to meaningCloud API
const axios = require('axios').default;
// defining express application
const app = express()
app.use(express.static('dist'))
app.use(cors());
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})
app.post('/meaningCloud', jsonParser, async function (req, res) {
    let objData = req.body;
    if (objData.lang == undefined || objData.lang == '') {
        objData.lang = 'en';
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    let objResponse = {
        result: true,
        message: 'Data has been recieved successfully',
        object: null
    }
    let strURL = "https://api.meaningcloud.com/sentiment-2.1";
    strURL += '?key=' + process.env.API_KEY;
    strURL += '&url=' + objData.URL;
    strURL += '&lang=' + objData.lang;
    await axios.post(strURL).then(function (response) {
        if (response.data.status.code !== '0') {
            objResponse.message = "Couldn't retrieve the data from meaningcloud , invalide API Key or Language is not supported";
        }
        objResponse.object = response.data;
    })

    res.json(objResponse);
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
