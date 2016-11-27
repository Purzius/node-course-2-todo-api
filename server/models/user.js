const mongoose = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    console.log(user);
    console.log(userObject);

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then((doc) => {
        return token;
    });
};

// {
//     email: 'mads@mail.com',
//     password: '$_!512astd32t65qteqtqetgaetgqeaty31ytgwrtjn4735y624532',
//     tokens: [{
//         access: 'auth',
//         tokens: 'poadgtjoadpjt31251qeqwafE_!2tq3tr3q'
//     }]
// }

var User = mongoose.model('User', UserSchema);

module.exports = {User};