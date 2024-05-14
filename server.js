const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT ||8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'recipe-api'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())    



//like an event listener. Network request.
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:recipe', (request, response) => {
    const recipeName = request.params.recipe.toLowerCase()
    if(recipes[recipeName]){
        response.json(recipes[recipeName])
    }else{
        response.json(recipes['unknown'])
    }
})

app.listen(PORT, () =>{
    console.log(`The server is now running on port ${PORT}.`)
})