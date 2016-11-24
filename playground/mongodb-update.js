const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) console.log(`Unable to connect to MongoDB: ${err}`);
    console.log(`Connected to MongoDB :)`);

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('58372bd28af65e26c4c92cff')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    db.collection('Users').findOneAndUpdate({
        name: "Jan"
    }, {
        $set: {
            name: "Mads"
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }).catch((err) => console.log(JSON.stringify(err, undefined, 2)));

    // db.close();
});