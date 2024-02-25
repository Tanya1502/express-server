const Blog = require('../models/blog');

module.exports.getAllBlogs = async function(){
   let blogs = await Blog.find({});
   return blogs;
}

module.exports.getBlogById = async function(id){
    let blog = await Blog.findOne({id: id});
    return blog;
}

module.exports.updateBlog = async function(id, updatedBlog){
    try {

        var oldBlog = await Blog.findOne({id: id});
        oldBlog.title = updatedBlog.title;
        oldBlog.image = updatedBlog.image;
        oldBlog.content = updatedBlog.content;
        await oldBlog.save();
        return true;
        
    } catch (error) {
        console.log(err);
        return false;
    }
}

module.exports.createBlog = function(newBlog){
   let blog = new Blog(newBlog);
   return blog.save();
}

module.exports.deleteBlog = async function(id){

    try {
        await Blog.deleteOne({_id: id})
       return true;
    } catch (error) {
        console.log(err);
        return false;
    }
}