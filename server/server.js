require('./config/config.js');

const _         = require('lodash');
const express   = require('express');
const bodyPaser = require('body-parser');
const {ObjectID}  = require('mongodb');

var {mongoose}  = require('./db/mongoose.js');
var {Todo}      = require('./models/todo.js');
var {User}      = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
const PORT = process.env.PORT;

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

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        // user here is the same as up the chain. It's an object.
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).json(user);
    }).catch((e) => {
        res.status(400).send();
    });
});

// POST login
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).json(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.json(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, (e) => res.status(400).send());
});

app.listen(PORT, () => console.log(`Fire on port ${PORT}`));

module.exports = {app};