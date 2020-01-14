const express = require('express'); 

const Hubs = require('../data/db.js'); 

const router = express.Router(); 



router.post('/', (req, res) => { 
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else{
        Hubs.insert(req.body) 
        .then(hubs => { 
            res.status(201).json(hubs);
        })
        .catch(err => { 
            console.log("Post error: ", err)
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
    }
})

router.post('/:id/comments', (req, res) => { 
    console.log('post id: ', req.body.post_id);
    if(req.body.post_id == undefined){
        res.status(404).json({message : " The post with the specified ID does not exist."})
    }else if(req.body.text == undefined){
        res.status(400).json({errorMessgae: "Please provide text for the comment."})
    }else{
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
    }
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
        if(hubs.length != 0){
            res.status(200).json(hubs)
        }else{
            res.status(404).json({message: "The post witht the specified ID does not exist."})
        }
    })
    .catch(error => { 
        console.log(error);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        })
    })
})

router.get('/:id/comments', (req, res) => {
    console.log('get comments by id:', req.params.id);
    Hubs.findCommentById(req.params.id)
    .then(hubs => { 
        if(hubs.length != 0){
            res.status(200).json(hubs); 
        }
        else{
            res.status(404).json({message: "The post with the specified id could not be retrieved."})
        }
    })
    .catch(err =>  {
        console.log('get by id err:', err)
        res.status(500).json({
            error: 'The comments information could not be retrieved.'
        })
    })
})


router.delete('/:id', (req, res) => { 
    Hubs.remove(req.params.id)
    .then(hubs => { 
        if(hubs.length != 0){
            res.status(200).json(hubs); 
        }
        else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(hubs => { 
        res.status(500).json({error: "This post could not be removed."})
    })
})


router.put('/:id/', (req, res) => { 
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else{

        Hubs.update(req.params.id, req.body)
        .then(hubs => {
            if(hubs !== 0){
                res.status(200).json(hubs); 
            }
            else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => { 
            console.log('put error: ', err);
            res.status(500).json({
                error: "The post with the specified ID does not exist."
            })

        })



    }
    
})



module.exports = router; 