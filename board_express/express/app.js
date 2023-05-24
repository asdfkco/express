const express = require('express');
const app = express();
const db = require('./db/index');

app.get(('/info'), (req,res) =>{

  db.connection.query('select * from users',(error,rows,fields)=>{
      if (error) throw error;
      console.log('해결');
      res.send(rows);
  });
})



app.use(express.json());


const userRouter = require('./user/index');
app.use('/user', userRouter);

const postRouter = require('./post/index');
app.use('/post',postRouter);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use((req,res,next) =>{
  console.log(`[${req.method}] ${req.path} | ${new Date().toLocaleDateString()}`);
  next();
})

app.use((error,req,res,next) =>{
  console.log(error.message);
  res.status(500).send({message:'서버 내부에서 오류가 발생하였습니다'})
})


app.get('*', (req,res)=>{
  res.status(405).send({message : '사용할 수 없는 라우터 입니다.'})
})

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

