const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

//creating API end points
router.get('/todos', (req, res, next) => {
    //This will return all the data, exposing only the id and action field to the client
    Todo,find({}, 'action')
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/todos', (req, res, next) => {
    if (req.body.action) {
        Todo.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    }
});

router.delete('/todos/:id', (req, res, next) => {
    //findOneAndDelete() - mongoDB function
    Todo.findOneAndDelete({ _id: req.params.id})
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;