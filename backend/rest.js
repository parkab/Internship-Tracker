const express = require('express');
const bodyParser = require('body-parser');

const app = express();

internships = [
    {id: 1, date: "date1", status: "status1", company: "company1", role: "role1", notes: "notes2"},
    {id: 2, date: "date11", status: "status11", company: "company11", role: "role11", notes: "notes22"}
];

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.get('/max-id', (req, res) =>{
    var max = 0;
    for (var i = 0; i < internships.length; i++){
        if (max < internships[i].id){
            max = internships[i].id;
        }
    }
    res.json({maxId: max});
})

// app.use((req, res, next) => {
//     console.log('tes2');
//     next();
// })

app.post('/add-internship', (req, res) =>{
    internships.push({id: req.body.id, date: req.body.date, status: req.body.status, company: req.body.company, role: req.body.role, notes: req.body.notes});
    res.status(200).json({
        message: 'post complete'
    })
})

app.delete('/remove-internship/:id', (req, res) =>{
    const index = internships.findIndex(el =>{
        return el.id == req.params.id;
    })
    internships.splice(index, 1);
    res.status(200).json({
        message: "delete complete"
    })
})

app.get('/internships', (req, res, next) => {
    res.json({'internships': internships});
    //res.send('express said hi');
})

module.exports = app;