const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('./user.js');

const scrypt = crypto.scrypt;

const verifyPassword = (password, salt, hashedPassword, callback) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) return callback(err);
        callback(null, derivedKey.toString('hex') === hashedPassword);
    });
};

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email',
            passwordField: 'password'
         },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'No user with that email' });
                
                
                verifyPassword(password, user.salt, user.password, (err, isMatch) => {
                    if (err) return done(err);
                    if (!isMatch) return done(null, false, { message: 'Password incorrect' });
                    return done(null, user);
                });
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        console.log('Serializing user:', user);
        process.nextTick(function(){
            done(null, user._id.toString());
        })
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log('Deserializing user ID:', id);
            const user = await User.findById(id);
            if (!user) {
                console.log('User not found');
                process.nextTick(function() {
                    done(new Error('User not found'));
                })
                
            } else {
                console.log('Deserialized user:', user);
                process.nextTick(function(){
                    done(null, user);
                })
            }
        } catch (err) {
            console.error('Deserialization error:', err);
            done(err);
        }
    });
};
