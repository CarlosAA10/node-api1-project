const express = require('express'); // CommonJS modules

const server = express(); 

server.use(express.json()); // teaches express how to read JSON from the body

const ids = require('short-id'); 

// console.log(ids.generate()); 

let users = [
    {
        id: ids.generate(), 
        name: 'Chief Chung', 
        bio: 'Leader of the Chiefs in ChungusVille'
    }, 
    {
        id: ids.generate(), 
        name: 'Mayor Chungus', 
        bio: 'Mayor of ChungusVille'
    }, 
]; 

server.get('/', (req, res) => {
    res.json({ api: 'Up and Running', cohort: 'web29' }); 
})

server.get('/api/users', (req, res) => {
    
    if (!users) {
        res.status(500).json({ errorMessage: "The Users Information could not be retrieved." })
    }
    else {
        res.status(200).json(users)
    }
 
}); 

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id; 

    const findUser = users.find(user => user.id == id)

    if(!findUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist."  })
    }

    else if(findUser) {
        res.status(200).json(findUser); 
    }

    else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }

})

server.post('/api/users', (req, res) => {
    let userInformation = req.body; 

    userInformation = { ...userInformation, id: ids.generate()}


    // creating if statement
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." }); 
    }

    else {
        users.push(userInformation); 

        res.status(201).json(userInformation); 
    }

})

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id; 
    const findUser = users.find(user => user.id == id)

    if(findUser) {
        users = users.filter(user => user.id != id); 
        res.status(200).json({ message: "User Successfully deleted" })
    }
    else if(!findUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else {
        res.status(500).json({ errorMessage: "The user could not be removed" }); 
    }




})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id; 

    let findUser = users.find(user => user.id == id)

    console.log(findUser); 

    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    if (findUser) {
        users = users.map(user => {
            if(user.id == id) {
                // return req.body
                return {...req.body, id: id}
            }
            else{
                return user
            }
        })

        res.status(200).json(users)
    }
    else if (!findUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else {
        res.status(404).json({  message: "The user with the specified ID does not exist." })
    }

})






server.listen(8000, () => console.log("\n== API is up ==\n")); 

