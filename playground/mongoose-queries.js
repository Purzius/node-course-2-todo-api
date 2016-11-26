const {ObjectID}    = require('mongodb');
const {mongoose}    = require('./../server/db/mongoose.js');
const {Todo}        = require('./../server/models/todo.js');
const {User}        = require('./../server/models/user.js');

// var id = '58396bf052c680138816c5e811';

// if(!ObjectID.isValid(id)) {
//     console.log(`ID not valid: ${id}`);
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(JSON.stringify(todo, undefined, 2));
// });

// Todo.findById(id).then((todoById) => {
//     if (!todoById) return console.log(`Id by id not found`);
//     console.log(JSON.stringify(todoById, undefined, 2));
// }).catch((e) => console.log(e));

var id = '58395b195f96ce2dc4e4d193';

User.findById(id).then((user) => {
    if(!user) return console.log(`No user found.`);

    console.log(JSON.stringify(user, undefined, 2));
}, (e) => console.log(e));