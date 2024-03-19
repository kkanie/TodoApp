require('dotenv').config()
//asdasd
const express = require('express')
const mongoose = require('mongoose')
// app express
const app = express()
const todoRoutes = require('./routes/todos')
const {connect} = require("mongoose");
//akdbahjbfkabkgj
//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/todos',todoRoutes)

//polaczenie z baza
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        // nasluchiwanie req
        app.listen(process.env.PORT, () =>{
            console.log('polaczono z baza, nasluchiwanie portu 4000')
        })
    })
    .catch((error)=>{
        console.log(error)
    })



