const express = require('express'); 
const hubsRouter = require('../hubs/hubs-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => { 
    res.send(`
        <h2>Lambda Hubs API</h2>
        <p> welcome to lambda hubs api </p>
    `)
})

server.use('/api/posts', hubsRouter);

module.exports = server; 