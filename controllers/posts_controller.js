const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id 
    })
    .then(function(post){
        console.log('Post created');
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Cannot create post');
    });

} 

