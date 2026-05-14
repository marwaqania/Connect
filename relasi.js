const SUPABASE_URL = "https://szfcwkyzrezkijemjwll.supabase.co";
const SUPABASE_KEY = "sb_publishable_6oLDaiJozQQlee8pKTsshw_xBak5lZh";

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
