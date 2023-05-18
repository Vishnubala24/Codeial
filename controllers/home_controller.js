const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({})
    // .then(function(posts){
    //     return res.render('home',{
    //         title: 'Codial | Home',
    //         posts: posts
    //     });
    // })

    // Populate the user of each post - With Async-Await 

    try{
        let posts = await Post.find({})
                    .sort('-createdAt')
                    .populate('user')
                    .populate({
                        path: 'comments',
                        populate:{
                            path: 'user'
                        }
                    });
    
       let user = await User.find();
          
        return res.render('home',{
            title: 'Codial | Home',
            posts: posts,
            all_users: user
        });

    }
    catch(err){
        console.log('Error', err);
    }
    // Populate the user of each post - Without Async-Await 
    /** 
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec()
    .then(function(posts){

        User.find()
        .then(function(users){
            return res.render('home',{
                title: 'Codial | Home',
                posts: posts,
                all_users: users
            });
        })
        
    })
    */

    // return res.render('home', {
    //     title: 'Home',
    //     posts: []
    // });
}