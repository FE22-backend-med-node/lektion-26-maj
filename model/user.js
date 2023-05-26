const nedb = require('nedb-promise');
const db = new nedb({ filename: 'users.db', autoload: true });

// hitta användare
async function findUser(username) {
    return await db.findOne({ username: username });
};

function saveUser(username, password) {
    db.insert({username: username, password: password});
};

module.exports = { findUser, saveUser };