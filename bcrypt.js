const bcrypt = require('bcryptjs');

// hasha lösenord
async function hashPassword(password) {
    const hashedPassord = await bcrypt.hash(password, 10);
    return hashedPassord;
};

// jämföra lösenord med hashning
async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

module.exports = { hashPassword, comparePassword };