const express = require('express');
const app = express();
const user = require('./router/user.js')
const bodops = require('body-parser');

app.use('/user',user)

const port = 3000;







app.all('*',(req,res) =>{
    res.status(404).send({message:'사용할수 없는 페이지입니다'})
})

app.listen(port, ()=>{
    console.log(`${port}시작`);
})