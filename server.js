const express = require('express')
const app = express()
const PORT = 8000
const recipes = {
    'mexican rice':{    
        'groceryItem1' : '1 cup rice',
        'groceryItem2' : '1 bell pepper',
        'groceryItem3' : '1/2 onion',
        'groceryItem4' : '1 small can tomato puree',
        'groceryItem5' : '2 cups chicken stock',
        'groceryItem6' : '1 clove garlic'
    },
    'picadillo' :{
        'groceryItem1' : '1lb ground beef',
        'groceryItem2' : '1 bell pepper',
        'groceryItem3' : '1/2 onion',
        'groceryItem4' : '1 small can tomato puree',
        'groceryItem5' : '2 cups chicken stock',
        'groceryItem6' : '1 clove garlic'
    },
    'shephard\'s pie' :{
        'groceryItem1' : '1 cup rice',
        'groceryItem2' : '1 bell pepper',
        'groceryItem3' : '1/2 onion',
        'groceryItem4' : '1 small can tomato puree',
        'groceryItem5' : '2 cups chicken stock',
        'groceryItem6' : '1 clove garlic'
    },
    'unknown' :{
        'groceryItem' : 'no such recipe'
    }
}


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