// const MongoClient = require('mongodb').MongoClient;
// var user = {name: 'mads', age: 25};
// var {name} = user;
// console.log(name);
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log(`Unable to connect to MongoDB server`, err);
    console.log(`Connected to MongoDB server :)`);

    db.collection('Todos').insertOne({
        text: 'Buy a cat',
        completed: false
    }, (err, result) => {
        if (err) return console.log(`Unable to insert todo`, err);
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('Users').insertOne({
    //     name: 'Peter',
    //     age: 18,
    //     location: 'Denmark'
    // }, (err, result) => {
    //     if(err) return console.log(`Unable to insert Users`, err);
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();
});