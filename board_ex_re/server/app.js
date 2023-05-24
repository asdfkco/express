const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const port = 8000;

app.use(cors({credentials:true,origin:"http://localhost:3000"}))

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'1234',
    database:'bbs'
})

app.get('/list',(req,res) =>{
    const sqlQuery = "select * from board"
    db.query(sqlQuery,(err,result)=>{
        res.send(result);
    })
})

app.get('/', (req,res) =>{
    const sqlQuery = "insert into requested (rowno) values(1)"
    db.query(sqlQuery,(err,result)=>{
        console.log(err)
        res.send("success")
    })
    
    console.log('reqeusted');
});

app.listen(port,()=>{
    console.log(`port start ${port}`);
})
