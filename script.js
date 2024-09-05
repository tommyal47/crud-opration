
const tableEl = document.getElementById('table');
const postSection = document.getElementById('show_post');

// get posts
function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        console.log(typeof(posts));
        
        displayPosts(posts)
    })
    .catch(error => console.error('Error:', error));
}

getPosts()

// display posts in table
function displayPosts(posts) {
    posts.forEach(p => {
        const tbodyEl = document.getElementById('t_body');
        const row = `
            <tr>
                <td>${p.id}</td>
                <td>${p.userId}</td>
                <td>${p.title}</td>
                <td>${p.body}</td>
                <td><button onclick=getPost(${p.id})>Show</button><button>Edit</button><button onclick=deletePost(${p.id})>Delete</button></td
            </tr>
        `
        tbodyEl.innerHTML += row; 
    });
}

// get single post
function getPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(post => showPost(post))
}

//desplay post
function showPost(post){
    tableEl.classList.add('hide');
    postSection.classList.remove('hide');
    postSection.innerHTML = `
        <h3>${post.title}</h3>
        <h5>User id: <span>${post.userId}</span></h5>
        <p>${post.body}</p>
        <button onclick=backToTable()>Back</button>
        <button onclick=editPost(${post.id})>Edit</button>
        <button onclick=deletePost(${post.id})>Delete</button>
    `
}

function backToTable(){
    postSection.classList.add('hide');
    tableEl.classList.remove('hide');
}

//delete post
function deletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method: 'DELETE'
    });
    console.log("deleted");
    
}