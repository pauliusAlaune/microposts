import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// get posts
function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// submit post
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    
    const data = {
        title,
        body
    }
    
    // create post
    http.post('http://localhost:3000/posts', data)
    .then(data => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err));
}