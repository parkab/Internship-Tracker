//console.log('running');
const http = require('http');
const axios = require('axios');
const express = require('./rest.js');

const server = http.createServer(express);

const port = 3000;
server.listen(port);

const url = `https://internship-tracker-q5u0.onrender.com/`;
const interval = 30000;

function reloadWebsite() {
    axios.get(url)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}

setInterval(reloadWebsite, interval);