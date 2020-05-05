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

    if (!users) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." }); 
    }

    else {
        users.map(currentUser => {
            if (id == currentUser.id) {
                res.status(200).json(currentUser)
            }
    
            else {
                res.status(404).json({ errorMessage: "The User with the specified ID does not exist." }); 
            }
        })
    }


    // if(id != users.id) {
        
    //     res.status(404).json({ errorMessage: "The User with the specified ID does not exist." }); 

    // }

    // else if (!users) {

    //     res.status(500).json({ errorMessage: "The user information could not be retrieved." }); 

    // }

    // else {
    //     res.status(200).json(users); 
    // }
})

server.post('/api/users', (req, res) => {
    const userInformation = req.body; 

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

    // find the user on the array and remove it 

    // creating if statement

    users = users.filter(user => user.id != id);

    res.status(200).json(users); 
})






server.listen(8000, () => console.log("\n== API is up ==\n")); 

