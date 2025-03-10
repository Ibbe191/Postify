const STORAGE_KEY = 'postify_posts';

let blogPosts = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

const blogForm = document.getElementById('blogForm');
const postsContainer = document.getElementById('posts-container');

function savePosts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
}

function displayPosts() {
    postsContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-header-content">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span>Namn: ${post.author}</span>
                        <span> | </span>
                        <span>Datum: ${post.date} kl. ${post.time}</span>
                    </div>
                </div>
                <button class="delete-button" onclick="deletePost(${post.id})">Ta bort</button>
            </div>
            <div class="post-content">
                ${post.content.replace(/\n/g, '<br>')}
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function deletePost(postId) {
    blogPosts = blogPosts.filter(post => post.id !== postId);
    savePosts();
    displayPosts();
}

blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    
    const post = {
        id: Date.now(),
        title,
        author,
        content,
        date: new Date().toLocaleDateString('sv-SE'),
        time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    };
    
    blogPosts.unshift(post);
    savePosts();
    displayPosts();
    
    blogForm.reset();
});

displayPosts();