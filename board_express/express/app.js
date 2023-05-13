const express = require('express');
const app = express();



app.use(express.json());


const userRouter = require('./user');
app.use('/user', userRouter);

const postRouter = require('./post');
app.use('/post',postRouter);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

