const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log(`Unable to connect to MongoDB server`, err);
    console.log(`Connected to MongoDB server :)`);

    // db.collection('Todos').find({
    //     _id: new ObjectID('58371f7c8342e1040c72e19c')
    // }).toArray().then((docs) => {
    //     console.log(`Todos`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => console.log(`Unable to fetch todos`, err));

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count`);
    //     console.log(JSON.stringify(count, undefined, 2));
    // }, (err) => console.log(`Unable to fetch todos`, err));

    db.collection('Users').find({name: 'Mads'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => console.log(`Unable to find user`));

    // db.close();
});