// locators
// locate table
const tableEl = document.getElementById('table');

// locate show section 
const postSection = document.getElementById('show_post');

// locate edit section
const postEl = document.getElementById('edit_post');

// locate elements to update the post
const useridEl = document.getElementById('p_userid');
const titleEl = document.getElementById('p_title');
const bodyEl = document.getElementById('p_body');
const updateButton = document.getElementById('p_update')


let updateId = null;

let allposts;
// get posts
function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        // console.log(typeof(posts));
        allposts = posts;
        displayPosts(allposts)
    })
    .catch(error => console.error('Error:', error));
}

getPosts()

// display posts in table
function displayPosts(posts) {
    tableEl.classList.remove('hide');
    postSection.classList.add('hide');
    postEl.classList.add('hide');
    posts.forEach(p => {
        const tbodyEl = document.getElementById('t_body');
        const row = `
            <tr>
                <td>${p.id}</td>
                <td>${p.userId}</td>
                <td>${p.title}</td>
                <td>${p.body}</td>
                <td>
                <button onclick="getPost(${p.id})">Show</button>
                <button onclick='editPost(${JSON.stringify(p)})'>Edit</button>
                <button onclick="deletePost(${p.id})">Delete</button>
                </td>
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
        <button onclick="backToTable()">Back</button>
        <button onclick='editPost(${JSON.stringify(post)})'>Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>
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

//edit post
function editPost(post){
    useridEl.value = post.userId;
    titleEl.value = post.title;
    bodyEl.value = post.body;
    tableEl.classList.add('hide');
    postSection.classList.add('hide');
    postEl.classList.remove('hide');
    updateId = post.id;
    console.log(updateId);
    console.log(allposts[0]);
    
    
}

//update post
function updatePost(){

    let newUserid = useridEl.value;
    let newTitle = titleEl.value;
    let newBody = bodyEl.value;
    console.log(newUserid, newTitle, newBody);

    let pos = allposts.find((p) => p.id === updateId)
    // console.log("to be updTED", pos);
    pos.userId = newUserid;
    pos.title = newTitle;
    pos.body = newBody;
    console.log(allposts);

    setTimeout(() =>console.log(allposts), 10000 )
    displayPosts(allposts);
    
    
    

    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         id: updateId,
    //         title: newTitle,
    //         body: newBody,
    //         userId: newUserid,
    //     })
    // })
    // console.log(updateId);
    // fetch(`https://jsonplaceholder.typicode.com/posts/${updateId}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       id: updateId,
    //       title: newTitle,
    //       body: newBody,
    //       userId: newUserid,
    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    
}
// updateButton.addEventListener('click',updatePost(updateId));

//cancel editing post
function cancelEdit(){
    postEl.classList.add('hide');
    tableEl.classList.remove('hide');
}