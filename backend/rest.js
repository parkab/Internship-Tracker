const express = require('express');
const bodyParser = require('body-parser');
const InternshipEntryModel = require('./entry-schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;

mongoose.connect('mongodb+srv://' + dbUser + ':' + dbPassword + '@internshiptracker.or0zw.mongodb.net/internshipsdb?retryWrites=true&w=majority&appName=internshiptracker')
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(() =>{
        console.log("failed to connect to mongodb");
    })

// internships = [
//     {id: 1, date: "date1", status: "status1", company: "company1", role: "role1", notes: "notes2"},
//     {id: 2, date: "date11", status: "status11", company: "company11", role: "role11", notes: "notes22"}
// ];

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

// app.get('/max-id', (req, res) =>{
//     var max = 0;
//     for (var i = 0; i < internships.length; i++){
//         if (max < internships[i].id){
//             max = internships[i].id;
//         }
//     }
//     res.json({maxId: max});
// })

// app.use((req, res, next) => {
//     console.log('tes2');
//     next();
// })

app.post('/add-internship', (req, res) =>{

    const internship = new InternshipEntryModel({date: req.body.date, status: req.body.status, company: req.body.company, role: req.body.role, notes: req.body.notes});
    internship.save()
        .then(() => {
            res.status(200).json({
                message: 'post complete'
            })
        })
    //console.log(internship);
    //internships.push({id: req.body.id, date: req.body.date, status: req.body.status, company: req.body.company, role: req.body.role, notes: req.body.notes});
})

app.delete('/remove-internship/:id', (req, res) =>{

    InternshipEntryModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: "delete complete"
        })
    })

    // const index = internships.findIndex(el =>{
    //     return el.id == req.params.id;
    // })
    // internships.splice(index, 1);
})

app.put('/update-internship/:id', (req, res) =>{

    const updatedInternship = new InternshipEntryModel({_id: req.body.id, date: req.body.date, status: req.body.status, company: req.body.company, role: req.body.role, notes: req.body.notes})
    InternshipEntryModel.updateOne({_id: req.body.id}, updatedInternship)
        .then(() => {
            res.status(200).json({
                message: 'update complete'
            })
        })

    // const index = internships.findIndex(el =>{
    //     return el.id == req.params.id;
    // })
    // internships[index] = {};
})

app.get('/internships', (req, res, next) => {

    InternshipEntryModel.find()
    .then((data) => {
        res.json({'internships': data});
    })
    .catch(() =>{
        console.log("failed to retrieve entries");
    })
    
    //res.json({'internships': internships});
    //res.send('express said hi');
})

module.exports = app;