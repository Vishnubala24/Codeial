{
    console.log('Hello');

    // Method to submit the form data using AJAX
    let create_post = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost))
                },
                error: function(err){
                    console.log(err);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">

        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}"> Delete </a>
            </small>
           
            <li>
                ${post.content}
                <small> ${post.user.name} </small>
            </li>
        </p>
        <div class="post-comments">
           
                <form action="comments/create" method="POST">
                    <input type="text" placeholder="Enter your Comment" name="content" required>
                    <br>
                    <input type="hidden" name="post" value="${post._id}" >
                    <br>
                    <input type="submit" value="Add Comment">
                </form>
           
        </div>
    
        <div id="post-comment-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
            
    </li>`)
    }


    // Delete post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(err){
                    console.log(err);
                }
            })
        });
    }

    create_post();
}

