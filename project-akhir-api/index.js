const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')

const app = express();
const port = 1995

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Project Akhir</h1>')
});

const { 
    userRouter,
    postRouter,
    loginRouter
} = require('./routers');

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/auth', loginRouter);
app.use(express.static('public'))

app.listen(port, () => console.log(`API jalan di port ${port}`));