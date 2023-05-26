const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { findUser, saveUser } = require('../model/user');
const { comparePassword, hashPassword } = require('../bcrypt');

// logga in
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // hitta användaren
    const user = await findUser(username);
    // kalla på hashedPassword(req.body.password, user.password) i bcrypt.js-filen
    console.log(user);
    const correctPassword = await comparePassword(password, user.password);

    let result = {
        success: false
    };

    if (correctPassword) {
        result.success = true;
        // skapa jwt
        const token = jwt.sign({ id: user._id }, 'a1b1c1', {
            expiresIn: 1200 // 20 min
        });
        result.token = token;
    } else {
        result.message = "Inkorrekta inloggningsuppgifter";
    }

    res.json(result);
});

// skapar konto
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const hashed = await hashPassword(password);
    // spara användaren i nedb
    saveUser(username, hashed);
    res.json({success: true});
});

// verifiera token
router.get('/verify', (req, res) => {
    // få in token från användaren
    // från användaren: 'Bearer 34598bsdhgflkjgs326432h!opwe2'
    // blir mha replace 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhxZFZXUzh2WHdiQ1dRMjIiLCJpYXQiOjE2ODUwOTQyODEsImV4cCI6MTY4NTA5NTQ4MX0.2qLol_KkhuMP81dfvcz-58obXRHbv1ChhORKmCU-qUs'
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        const data = jwt.verify(token, 'a1b1c1');
        console.log(data);
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: 'Invalid token'});
    }
});

module.exports = router;

// fetch('URL_GOES_HERE', {
//     headers: {
//         'Authorization': 'Bearer ' + token
//     }
// });