const _         = require('lodash');
const express   = require('express');
const bodyPaser = require('body-parser');
const {ObjectID}  = require('mongodb');

var {mongoose}  = require('./db/mongoose.js');
var {Todo}      = require('./models/todo.js');
var {User}      = require('./models/user.js');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyPaser.json());

app.post('/todos', (req, res) => {
    console.log(JSON.stringify(req.body, undefined, 2));
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo) => {
        res.json({todo});
    }, (e) => {
        res.status(400).json(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.json({todos});
    }, (e) => res.status(400).json(e));
});

app.get('/todos/:todoID', (req, res) => {
    var id = req.params.todoID;

    // Validate id
    if(!ObjectID.isValid(id)) { return res.status(404).send() }

    Todo.findById(id).then((todo) => {
        if(!todo) return res.status(404).send();
        res.json({todo});
    }, (e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:todoID', (req, res) => {
    var id = req.params.todoID;

    if(!ObjectID.isValid(id)) { return res.status(404).send(); }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) { return res.status(404).send(); }
        res.json({todo});
    }).catch((e) => res.status(400).send());
});

app.patch('/todos/:todoID', (req, res) => {
    var id = req.params.todoID;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) { return res.status(404).send(); }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) return res.status(404).send();

        res.json({todo});
    }).catch((e) => res.status(400).send());
});

app.listen(PORT, () => console.log(`Fire on port ${PORT}`));

module.exports = {app};