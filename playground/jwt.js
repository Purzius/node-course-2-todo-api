const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(`Token: ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log(`Decoded: ${JSON.stringify(decoded, undefined, 2)}`);