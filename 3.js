let blogs = [
  {
    id: 1,
    title: "Blog",
    content: "First blog",
    author: "Priyansh",
    date: "2025-07-22",
  },
  {
    id: 2,
    title: "vloggg",
    content: "Learning frontend .",
    author: "rajah",
    date: "2025-07-22",
  },
];

let blogIdCounter = blogs.length + 1;

function displayBlogs(blogArray = blogs) {
  const blogList = document.getElementById("blogList");
  blogList.innerHTML = "";

  if (blogArray.length === 0) {
    blogList.innerHTML =
      "<li class='text-gray-500 text-center py-8'>No blogs available.</li>";
    return;
  }

  blogArray.forEach((blog) => {
    const li = document.createElement("li");
    li.className = "rounded-lg border p-4 bg-gray-50 space-y-2 shadow-sm";
    li.innerHTML = `
      <h3 class="text-lg font-bold text-gray-800">${blog.title}</h3>
      <p class="text-gray-700">${blog.content}</p>
      <div class="text-sm text-gray-500">
        <strong>Author:</strong> ${blog.author} |
        <strong>Date:</strong> ${blog.date}
      </div>
      <button class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md" onclick="deleteBlog(${blog.id})">
        Delete
      </button>
    `;
    blogList.appendChild(li);
  });
}

function addBlog(title, content, author) {
  const date = new Date().toISOString().split("T")[0];
  const newBlog = {
    id: blogIdCounter++,
    title,
    content,
    author,
    date,
  };
  blogs.push(newBlog);
  displayBlogs();
}

function deleteBlog(id) {
  blogs = blogs.filter((blog) => blog.id !== id);
  displayBlogs();
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const filtered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query)
  );
  displayBlogs(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  displayBlogs();

  document.getElementById("addBlogBtn")?.addEventListener("click", () => {
    const title = document.getElementById("titleInput").value.trim();
    const content = document.getElementById("contentInput").value.trim();
    const author = document.getElementById("authorInput").value.trim();

    if (title && content && author) {
      addBlog(title, content, author);
      document.getElementById("titleInput").value = "";
      document.getElementById("contentInput").value = "";
      document.getElementById("authorInput").value = "";
      alert("Blog added successfully!");
    } else {
      alert("All fields are required!");
    }
  });

  const searchInput = document.getElementById("searchInput");
  const debouncedSearch = debounce(handleSearch, 300);
  searchInput?.addEventListener("input", debouncedSearch);
});
