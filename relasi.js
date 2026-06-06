const SUPABASE_URL = "https://szfcwkyzrezkijemjwll.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZmN3a3l6cmV6a2lqZW1qd2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUwMDMsImV4cCI6MjA5NDMzMTAwM30.jXn9Gngy3y-kW9802bIPAMmYgg-ENTw1CulTQZwyX74";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// CREATE POST
async function createPost() {

  console.log("clicked");

  const username =
    document.getElementById("username").value;

  const title =
    document.getElementById("title").value;

  const content =
    document.getElementById("content").value;

  if (!username || !title || !content) {
    return;
  }

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

// CREATE REPLY
async function createReply(postId) {

  const username =
    document.getElementById(`reply-name-${postId}`).value;

  const reply =
    document.getElementById(`reply-input-${postId}`).value;

  if (!username || !reply) {
    return;
  }

  const { error } = await supabaseClient
    .from("replies")
    .insert([
      {
        post_id: postId,
        username,
        reply
      }
    ]);

  if (error) {
    console.error(error);
  } else {

    console.log("REPLY SUCCESS");

    document.getElementById(
      `reply-name-${postId}`
    ).value = "";

    document.getElementById(
      `reply-input-${postId}`
    ).value = "";

    loadPosts();
  }
}

// LOAD REPLIES
async function loadReplies(postId) {

  const { data, error } = await supabaseClient
    .from("replies")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return "";
  }

  let repliesHTML = "";

  data.forEach(reply => {

    repliesHTML += `
      <div class="reply-card">

        <small>
          <b>${reply.username}</b>
        </small>

        <p>${reply.reply}</p>

      </div>
    `;
  });

  return repliesHTML;
}

// LOAD POSTS
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

  for (const post of data) {

    const repliesHTML =
      await loadReplies(post.id);

    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `
      <div class="post-card">

        <h2>${post.title}</h2>

        <small>
          Posted by <b>${post.username}</b>
        </small>

        <p>${post.content}</p>

        <div class="replies-section">

          <h4>Replies</h4>

          ${repliesHTML}

          <input
            type="text"
            id="reply-name-${post.id}"
            placeholder="Your name"
          >

          <input
            type="text"
            id="reply-input-${post.id}"
            placeholder="Write a reply..."
          >

          <button
            onclick="createReply(${post.id})"
          >
            Reply
          </button>

        </div>

      </div>
    `;

    postsDiv.appendChild(div);
  }
}

// LOAD POSTS AUTOMATICALLY
loadPosts();
const pages =
  document.getElementById("pages");

const forumTab =
  document.getElementById("forum-tab");

const quizTab =
  document.getElementById("quiz-tab");

forumTab.addEventListener("click", () => {

  pages.style.transform =
    "translateX(0%)";

  forumTab.classList.add("active");
  quizTab.classList.remove("active");

});

quizTab.addEventListener("click", () => {

  pages.style.transform =
    "translateX(-50%)";

  quizTab.classList.add("active");
  forumTab.classList.remove("active");

});