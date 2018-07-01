import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// lister for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// lister for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
    const id = document.querySelector('#id').value;
    const data = {
        title,
        body
    }
    if(title === '' || body === ''){
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {

        
        if(id === ''){
            // create post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post Added', 'alert alert-success');
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err)); 
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post Update', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err)); 
        }
    }
}

// enable edit state
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const data = {
            id,
            title,
            body
        }
        // fill form with current post
        ui.fillForm(data);
        
    }
    
    e.preventDefault();
}

// cancel edit state
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}