const express = require("express");
const router = express.Router();
const db = require('../db/index');
const tokenService = require("../jwt");

// 사용자 정보를 담을 배열
const users = [];
async function user_insert(id_value,name_value,password_value) {
  console.log(`insert into users (id,name,password) values('${id_value}','${name_value}','${password_value}')`);
  db.connection.query(`insert into users (id,name,password) values ('${id_value}','${name_value}','${password_value}')`,(err,rows,fields)=>{
    if(err) throw err;
  })
};

// 회원가입
router.post("/register", (req, res) => {
  const { id, password, name } = req.body;
  // TODO id, password, name이 있는지 체크한다.
  if (!id || !password || !name) {
    res
      .status(400)
      .send({ message: "id, password, name은 필수입력 사항입니다." });
    return;
  }

  // TODO id는 중복되지 않도록한다.
  const user = users.find((user) => user.id === id);
  if (user) {
    res.status(400).send({ message: "이미 존재하는 아이디입니다." });
    return;
  }

  // TODO 사용자를 추가한다.
  user_insert(req.body.id,req.body.name,req.body.password);
  res.send({ message: "사용자를 등록했습니다." });
});

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).send({ message: "id,password 부족" });
    return;
  }
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(400).send({ message: "id없다" });
    return;
  }

  if (user.password !== password) {
    res.status(400).send({ message: "pass없음" });
    return;
  }

  res.status(200).send({ token: tokenService.getToken(id) });
});

router.post("/check", (req, res) => {
  res.send(users);
});

module.exports = router;
