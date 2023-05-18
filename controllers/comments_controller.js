const Comments = require('../models/comments');
const Posts = require('../models/posts');

module.exports.create = async function(req, res){

    try{
        let post = await Posts.findById(req.body.post);
    
        let comment = await Comments.create({
                            content: req.body.content,
                            post: req.body.post,
                            user: req.user._id
                        });
        
        post.comments.push(comment);
        post.save();

        res.redirect('/');
   
    }catch(err){
        console.log('Error', err);
    }

};

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comments.findById(req.params.id)
    
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.deleteOne();

            let post = await Posts.findByIdAndUpdate( postId, { $pull: {comments: req.params.id}});
            
            return res.redirect('back');
            
        }
        else{
            return res.redirect('back');
        }
    
    }catch(err){
        console.log('Error', err);
    }
}