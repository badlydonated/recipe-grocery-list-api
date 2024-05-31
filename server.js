
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
//const mongoose = require('mongoose')
const ejs = require('ejs')
const PORT = process.env.PORT ||8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'recipe-api'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.json())    

//mongoose.connect('')

    
app.get("/", (request, response) =>{
    db.collection('recipe-ingredients').find().toArray()
    .then(data => {
        response.status(200).render("index", {pageTitle: "home page", list: data})
    })
})
        

app.listen(PORT, () =>{
    console.log(`The server is now running on port ${PORT}.`)
})