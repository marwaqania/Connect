const SUPABASE_URL = "https://szfcwkyzrezkijemjwll.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZmN3a3l6cmV6a2lqZW1qd2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUwMDMsImV4cCI6MjA5NDMzMTAwM30.jXn9Gngy3y-kW9802bIPAMmYgg-ENTw1CulTQZwyX74";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function createPost() {

  const username =
    document.getElementById("username").value;

  const title =
    document.getElementById("title").value;

  const content =
    document.getElementById("content").value;

  const { error } = await supabaseClient
    .from("posts")
    .insert([
      {
        username,
        title,
        content
      }
    ]);

  if (error) {
    console.error(error);
  }
}
