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
        tbodyEl.innerHTML = `
            <tr>
                <td>${p.id}</td>
                <td>${p.userId}</td>
                <td>${p.title}</td>
                <td>${p.body}</td>
            </tr>
        `
    });
}