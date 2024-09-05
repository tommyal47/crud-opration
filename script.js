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
                <td><button>Show</button><button>Edit</button><button>Delete</button></td
            </tr>
        `
        tbodyEl.innerHTML += row; 
    });
}