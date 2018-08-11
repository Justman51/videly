const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

async function run() {
    const  salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(myPlaintextPassword, salt);
    console.log(salt);
    console.log(hashed)
}

run();
