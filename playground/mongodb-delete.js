const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log(`Unable to connect to MongoDB server.`);

    console.log(`Connected to MongoDB :)`);

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Buy a cat'}).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // }, (e) => console.log(JSON.stringify(e, undefined, 2)));

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Buy a cat'}).then((result) => {
    //     console.log(result);
    // }, (e) => console.log(JSON.stringify(e, undefined, 2)));

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // delete users
    db.collection('Users').deleteMany({name: 'Peter'}).then((result) => console.log(JSON.stringify(result, undefined, 2)));
    db.collection('Users').findOneAndDelete({_id: new ObjectID('58372096ac8a692c50115051')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    // db.close();
});