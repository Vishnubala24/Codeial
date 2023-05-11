const Comments = require('../models/comments');
const Posts = require('../models/posts');

module.exports.create = function(req, res){

    Posts.findById(req.body.post)
    .then(function(post){
        Comments.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        .then(function(comment){
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        })
    })

}