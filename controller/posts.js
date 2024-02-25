var express = require('express');
const fs = require('fs');
var router = express.Router();
const authMiddleware = require('../auth/authentication');
const authorization = require('../auth/authorization');
const {getBlogById, getAllBlogs, updateBlog, createBlog, deleteBlog} = require('../dao/blogs');


router.get('/', async (req, res) => {
    res.json(await getAllBlogs());
    res.json(blogs);
})

router.get('/:postId', async (req, res) => {
    res.json(await getBlogById(req.params.postId));
    
    
})

// router.get('/posts', (req, res) => {
//     var blogs = JSON.parse(fs.readFileSync('blogs.json'));
//     console.log(req.query.postId)
//     var blog = blogs.find(e => e.id == req.query.postId);
//     res.json(blog);
// })

router.post('/', async(req, res) =>{
    try{
        await createBlog(req.body)
        res.status(201).send();
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
})

router.put('/:postId',async (req, res) => {
    try{
        await updatedBlog(req.params.postId, req.body)
        res.status(201).send('Update successfully');
    }
    catch(err){
        console.log(err);
        res.status(500).send('Update failed');
    }
})

router.delete('/:postId', authMiddleware, authorization, async(req, res) => {
     await deleteBlog(req.params.postId);
     res.status(200).json({message: 'Delete successful'})
})

module.exports = router;