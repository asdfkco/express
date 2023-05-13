const express = require('express');
const router = express.Router();

const posts ={
    data:[],
    id:1,
}

router.get('/',(req,res)=>{
    res.send(posts.data);
})

router.get('/:id',(req,res)=>{
    const post = posts.data.find((post) => post.id === parseInt(req.params.id));

    if(!post) {
        res.status(400).send({message : '존재하지 않는 글.'});
        console.log(post);
        return;
    }
    res.send(post);
})

router.post('/',(req,res)=>{
    const {title,content} = req.body;

    if(!title || !content){
        res.status(400).send({message:'title,content는 필수 입력 사항'});
        return;
    }

    posts.data.push({
        ...req.body,
        id:posts.id,
    });
    posts.id++;
    res.send({message : '글을 등록하셨습니다'});
})

router.put('/:id',(req,res) => {
    const {title,content} = req.body;

    if(!req.params.id || !title || !content){
        res.status(400).send({message : 'id, title, content는 필수 입력 사항입니다.'});
        return;
    }
    const post = posts.data.find((post) => post.id === parseInt(req.params.id));

    if(!post){
        res.status(400).send({message : '존재하지 않는 글입니다.'});
        return;
    }

    post.title = title;
    post.content = content;
    res.send({message : '글을 수정했습니다.'});
})

router.delete('/:id',(req,res) =>{
    if(!req.params.id){
        req.status(400).send({message:'id는 필수 사항'});
        return;
    }
    const post = posts.data.find((post)=>post.id === parseInt(req.params.id));
    if(!post){
        res.status(400).send({message : '존재하지 않는 글입니다'});
        return;
    }

    posts.data = posts.data.filter((_post) => _post.id !== post.id);
    res.send({message:'글을 삭제하였습니다.'})
})

module.exports = router;