const SUPABASE_URL = "https://szfcwkyzrezkijemjwll.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZmN3a3l6cmV6a2lqZW1qd2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUwMDMsImV4cCI6MjA5NDMzMTAwM30.jXn9Gngy3y-kW9802bIPAMmYgg-ENTw1CulTQZwyX74";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function createPost() {

  console.log("clicked");

  const username =
    document.getElementById("username").value;

  const title =
    document.getElementById("title").value;

  const content =
    document.getElementById("content").value;

  const { data, error } = await supabaseClient
    .from("posts")
    .insert([
      {
        username,
        title,
        content
      }
    ]);

  console.log(data);
  console.log(error);

  if (error) {
    console.error(error);
  } else {

    console.log("POST SUCCESS");

    // Clear inputs
    document.getElementById("username").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    // Reload posts
    loadPosts();
  }
}

async function loadPosts() {

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const postsDiv =
    document.getElementById("posts");

  postsDiv.innerHTML = "";

  data.forEach(post => {

    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `
      <div class="post-card">
        <h2>${post.title}</h2>

        <small>
          Posted by <b>${post.username}</b>
        </small>

        <p>${post.content}</p>
      </div>
    `;

    postsDiv.appendChild(div);

  });
}

// Load posts automatically when page opens
loadPosts();
