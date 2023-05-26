const express = require('express');
const app = express();

const userRouter = require('./routes/user');

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(9090, () => {
    console.log('Server started on port 9090');
});