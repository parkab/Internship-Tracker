const express = require('express');
const app = express();

internships = [
    {id: 1, date: "date1", status: "status1", company: "company1", role: "role1", notes: "notes2"}
];

// app.use((req, res, next) => {
//     console.log('tes2');
//     next();
// })

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/internships', (req, res, next) => {
    res.json({'internships': internships});
    //res.send('express said hi');
})

module.exports = app;