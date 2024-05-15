const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT ||8000
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())    

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'recipe-api'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        infoCollection = db.collection('recipe-ingredients')
    

        //like an event listener. Network request.
        app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
        })

        app.get('/api/:recipe', (request, response) => {
        const recipeSubmit = request.params.recipe.toLowerCase()
            infoCollection.find({recipeName:recipeSubmit}).toArray()
            .then(results =>{
                console.log(results)
                response.json(results[0])
            })
            .catch(error => console.err(error))
        }) 
    })
    .catch(error => console.err(error))

app.listen(PORT, () =>{
    console.log(`The server is now running on port ${PORT}.`)
})