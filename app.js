if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const fetch = require('node-fetch');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "index.html");
});

const api_key = process.env.API_KEY;

app.get("/playerName", async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };
    
    const fetchApi = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=kevin%20de%20bruyne&pageNumber=1&pageSize=50&autoCorrect=true', options)
    const dataNamePlayer = await fetchApi.json();
    res.json(dataNamePlayer);
    console.log(dataNamePlayer);
});

app.post('/', (req, res) => {
    const name = req.body.name;
    console.log(name);
})



app.listen(3000, () => {
    console.log("serve's running on port 3000");
});