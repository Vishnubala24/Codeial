const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = async function(req, res){
    
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id 
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post created'
            });
        }
        console.log('Post created');
        req.flash('success', 'Post Created.')
        return res.redirect('back');
    } 
    catch(err){
        console.log('Cannot create post', err);
        req.flash('error', err);
    }

} 

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id)
    
        // .id means converting object id to string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post: req.params.id})
            .then(function(data){

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: 'Post deleted'
                    });
                }

                req.flash('success', 'Post Deleted with associated comments.')
                return res.redirect('back');
            })

        }
        req.flash('error', 'Unauthorized');
    }
    catch(err){
        console.log('Error', err);
        req.flash('error', err);
    }
}

