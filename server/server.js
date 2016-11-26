const express   = require('express');
const bodyPaser = require('body-parser');

var {mongoose}  = require('./db/mongoose.js');
var {Todo}      = require('./models/todo.js');
var {User}      = require('./models/user.js');

var app = express();

app.use(bodyPaser.json());

app.post('/todos', (req, res) => {
    console.log(JSON.stringify(req.body, undefined, 2));
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.json(doc);
    }, (e) => {
        res.status(400).json(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.json({todos});
    }, (e) => res.status(400).json(e));
});



app.listen(3000, () => console.log(`Fire on port 3000`));

module.exports = {app};