const mongoose = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');
const bcrypt    = require('bcrypt');

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

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('Verification failed.');
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    
    return User.findOne({email}).then((user) => {
        if (!user) return Promise.reject('User not found.');

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) reject('Password match failed.');
                else if (!res) reject('Passwords did not match.');
                else resolve(user);
            });
        });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 12, function(err, hash) {
            if (err) console.log(`User password encryption failed.`);
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

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