const bcrypt = require('bcrypt');

var password = '123qwe';

console.log(`Start: ** ${new Date().getSeconds()}:${new Date().getMilliseconds()} `);

// bcrypt.genSalt(12, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//         console.log(`End: ** ${new Date().getSeconds()}:${new Date().getMilliseconds()} `);
//     });
// });


var hashedPassword = '$2a$12$mxF6o/Yn6kRUDE5DDpaaEe7qWVA7GPpdnai7Hfew0zzgTm5RJS1XW';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
    console.log(`compare: ** ${new Date().getSeconds()}:${new Date().getMilliseconds()} `);
});