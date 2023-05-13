const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const db = require('../config/database.js');
const connection = mysql.createConnection(db);

router.get(('/info'), (req,res) =>{

    connection.query('select * from Users',(error,rows,fields)=>{
        if (error) throw error;
        console.log('해결');
        res.send(rows);
    });
})

module.exports = router;