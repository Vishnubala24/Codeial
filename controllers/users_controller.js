const User = require('../models/users');

module.exports.default = function(req, res){
    return res.render('users', {
        title: 'User',
        user_msg: ''
    });
}

module.exports.profile = function(req, res){

    if(!req.cookies.user_id){
        return res.redirect('/users/signin');
    }

    User.findById(req.cookies.user_id)
    .then(function(user){

        if(user){
            return res.render('users', {
                title: 'User',
                user_msg: 'Hello ' + user.name,
                uname: user.name,
                email_id: user.email
            });
        }
        return res.redirect('/users/signin');

    });
}

module.exports.signup = function(req, res){
    return res.render('user_signup', {
        title: 'User',
        user_msg: 'VB Up'
    });
}

module.exports.signin = function(req, res){
    return res.render('user_signin', {
        title: 'User',
        user_msg: 'Sign In'
    });
}

module.exports.createUser = function(req, res){

    if(req.body.upass != req.body.upass_c){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email_id})
    .then(function(data){
        console.log('User already exist', data);
        if(!data){
            User.create({
                name: req.body.uname,
                email: req.body.email_id,
                password: req.body.upass
            })
            .then(function(data){
                console.log('Succesful Sign Up', data);
            })
            .catch(function(err){
                console.log('Error while creating User for Sign Up', err);
            })
        }
    })
    .catch(function(err){
        console.log('Error while creating User for Sign Up', err);
    });

    return res.redirect('back');
}

module.exports.createSession = function(req, res){

    User.findOne({email: req.body.uname})
    .then(function(data){
        //console.log('User already exist', data);
        if(data){
            
            if(req.body.upass !== data.password){
                res.redirect('back');
            }

            res.cookie('user_id', data._id);
            return res.redirect('/users/profile');
        }
        return res.redirect('back');
    })
}