module.exports.default = function(req, res){
    return res.render('users', {
        title: 'User',
        user_msg: ''
    });
}

module.exports.profile = function(req, res){
    return res.render('users', {
        title: 'User',
        user_msg: 'Hello VB!!'
    });
}