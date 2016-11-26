const {ObjectID}    = require('mongodb');

const {mongoose}    = require('./../server/db/mongoose.js');
const {Todo}        = require('./../server/models/todo.js');
const {User}        = require('./../server/models/user.js');

// remove all
// Todo.remove({}).then((result) => console.log(result));

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5839caa39eebbc3871ea03c6').then((doc) => {
    console.log(doc);
});