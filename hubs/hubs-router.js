const express = require('express'); 

const Hubs = require('../data/db.js'); 

const router = express.Router(); 



router.post('/', (req, res) => { 
    Hubs.insert(req.body) 
    .then(hubs => { 
        res.status(200).json(hubs);
    })
    .catch(err => { 
        console.log("Post error: ", err)
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

router.post('/:id/comments', (req, res) => { 
    Hubs.insertComment(req.body)
    .then(hubs => { 
        res.status(200).json(hubs); 
    })
    .catch(err => { 
        console.log("Post by id error: ", err);
        res.status(200).json({
            errorMessage: "Please provide text for the comment."
        })
    })
})




router.get('/', (req, res) => { 
    Hubs.find(req.query)
    .then(hubs => { 
        res.status(200).json(hubs);
    })
    .catch(error => { 
        console.log(error); 
        res.status(500).json({
            error: 'The posts information could not be retrieved.', 
        })
    })
})




router.get('/:id', (req, res) => { 
    Hubs.findById(req.params.id)
    .then( hubs => { 
        res.status(200).json(hubs)
    })
    .catch(error => { 
        console.log(error);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        })
    })
})

router.get('/:id/comments', (req, res) => { 
    Hubs.findCommentById(req.params.id)
    .then(hubs => { 
        res.status(200).json(hubs)
    })
    .catch(err =>  {
        console.log('get by id err:', err)
        res.status(500).json({
            error: 'The comments information could not be retrieved.'
        })
    })
})

router.put('/:id/', (req, res) => { 
    Hubs.update(req.params.id, req.body)
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(err => { 
        console.log('put error: ', err);
        res.status(500).json({
            error: "The post with the specified ID does not exist."
        })

    })
})



module.exports = router; 