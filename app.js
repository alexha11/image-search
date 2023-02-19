if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// const session = require('express-session');
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const fetch = require('node-fetch');

const app = express();



// app.use(session({
//     secret: 'mySecretKey', // replace with your own secret key
//     resave: false,
//     saveUninitialized: true
// }));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "index.html");
});

const api_key = process.env.API_KEY;

let playerName = '';

app.post('/', (req, res) => {
    playerName = req.body.name;
    
    //res.send('Name received');
})
//const url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=kevin%20de%20bruyne&pageNumber=1&pageSize=50&autoCorrect=true'

app.get("/playerName", async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };
    let st = ''
    for(let i = 0; i < playerName.length; i++) {
        //console.log(playerName[i]);
        if (playerName[i] === ' '){
            st = st + '%20';
        }
        else {
            st = st + playerName[i]; 
        }
    }
    console.log(st);
    const url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=' + st + '&pageNumber=1&pageSize=50&autoCorrect=true'
    
    const fetchApi = await fetch(url, options)
    const dataNamePlayer = await fetchApi.json();
    res.json(dataNamePlayer);
    //console.log(dataNamePlayer);
});



app.listen(3000, () => {
    console.log("serve's running on port 3000");
});