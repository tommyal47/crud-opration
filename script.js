// locators
// locate table
const tableEl = document.getElementById('table');

// locate show section 
const postSection = document.getElementById('show_post');

//locate pagination 
const paginationEl = document.getElementById('pagination');

// locate edit section
const postEl = document.getElementById('edit_post');

// locate elements to update the post
const useridEl = document.getElementById('p_userid');
const titleEl = document.getElementById('p_title');
const bodyEl = document.getElementById('p_body');
const updateButton = document.getElementById('p_update')
let currentPage = 1;

// locate current page element
const currentPageEl = document.getElementById('c_page');
const postsPerPageEl = document.getElementById('n_posts');
let postsPerPage = document.getElementById('n_posts').value;
const previosButton = document.getElementById('p_page');
const nextButton = document.getElementById('n_page');
let totalPages;
let startIndex;
let endIndex;
let updateId = null;
let allposts;

// get posts
function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        allposts = posts;
        totalPages = Math.ceil(allposts.length / postsPerPage);
        displayPosts(currentPage);
        setupPagination()
    })
    .catch(error => console.error('Error:', error));
}

getPosts()

// display posts in table
function displayPosts(page) {
    // posts to be shown depends on pagination
    startIndex = (page - 1) * postsPerPage
    endIndex = startIndex + Number(postsPerPage);
    postsToDisplay = allposts.slice(startIndex, endIndex);
    const tbodyEl = document.getElementById('t_body');
    tbodyEl.innerHTML = ''
    tableEl.classList.remove('hide');
    paginationEl.classList.remove('hide');
    postsPerPageEl.classList.remove('hide');
    postSection.classList.remove('hide');
    postSection.classList.add('hide');
    postEl.classList.add('hide');
    
    postsToDisplay.forEach(p => {
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

//display post
function showPost(post){
    tableEl.classList.add('hide');
    paginationEl.classList.add('hide');
    postSection.classList.remove('hide');
    postsPerPageEl.classList.add('hide');
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
    postsPerPageEl.classList.remove('hide');
    paginationEl.classList.remove('hide');
}

//delete post
function deletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method: 'DELETE'
    });
    alert("post deleted successfully")
    displayPosts(currentPage)
    // console.log("deleted");
}

//edit post
function editPost(post){
    useridEl.value = post.userId;
    titleEl.value = post.title;
    bodyEl.value = post.body;
    tableEl.classList.add('hide');
    paginationEl.classList.add('hide');
    postsPerPageEl.classList.add('hide');
    postSection.classList.add('hide');
    postEl.classList.remove('hide');
    updateId = post.id;
    // console.log(updateId);
    // console.log(allposts[0]);
    
    
}

//update post
function updatePost(id){

    let newUserid = useridEl.value;
    let newTitle = titleEl.value;
    let newBody = bodyEl.value;
    // console.log(newUserid, newTitle, newBody);

    let pos = allposts.find((p) => p.id === updateId)
    // console.log("to be updTED", pos);
    pos.userId = newUserid;
    pos.title = newTitle;
    pos.body = newBody;
    // console.log(allposts);

    // setTimeout(() =>console.log(allposts), 10000 )
    displayPosts(currentPage);
    
    
    

    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         id: updateId,
    //         title: newTitle,
    //         body: newBody,
    //         userId: newUserid,
    //     })
    // })
    // .then((response) =>console.log( response.json()));
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
    paginationEl.classList.remove('hide');
    postsPerPageEl.classList.remove('hide');
}


// setup pagination control 
function setupPagination(){
    // handle previos button click
    if (currentPage <= 1) {
        previosButton.disabled = true;
    }
    // handle next button click
    
    if (currentPage === totalPages) {
        nextButton.disabled = true;
    }
    previosButton.addEventListener('click', () => {
        currentPage--;
        if (currentPage < totalPages) {
            nextButton.disabled = false;
        }
        previosButton.disabled = currentPage == 1;
        displayPosts(currentPage);
        currentPageEl.textContent = currentPage;
    });
    nextButton.addEventListener('click', () => {
        currentPage++;
        if (currentPage > 1) {
            previosButton.disabled = false;
        }
        
        nextButton.disabled = currentPage == totalPages;
        displayPosts(currentPage);
        currentPageEl.textContent = currentPage;
    });
}


postsPerPageEl.addEventListener('change', function (e) {
    postsPerPage = e.target.value;
    totalPages = Math.ceil(allposts.length / postsPerPage);
    currentPage = 1;
    currentPageEl.textContent = currentPage;
    if (totalPages === 1){
        nextButton.disabled = true;
    }
    else{
        nextButton.disabled = false;
    }
    console.log(currentPage);
    
    if (currentPage === 1 ){
        previosButton.disabled = true;
    }
    else{
        previosButton.disabled = false;
    }
    displayPosts(currentPage);
});