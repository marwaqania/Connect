const SUPABASE_URL = "https://szfcwkyzrezkijemjwll.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_6oLDaiJozQQlee8pKTsshw_xBak5lZh";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function createPost() {
  const username = document.getElementById("username").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!username || !title || !content) {
    alert("Fill all fields");
    return;
  }

  await supabase
    .from("posts")
    .insert([
      {
        username,
        title,
        content
      }
    ]);

  loadPosts();
}

async function loadPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const postsDiv = document.getElementById("posts");

  postsDiv.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `
      <h2>${post.title}</h2>
      <small>Posted by ${post.username}</small>
      <p>${post.content}</p>
    `;

    postsDiv.appendChild(div);
  });
}

loadPosts();
