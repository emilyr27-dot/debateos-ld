// Initialize Supabase connection
const supabaseUrl = 'YOUR_SUPABASE_URL';  // Replace with your Supabase URL
const supabaseKey = 'YOUR_SUPABASE_KEY';  // Replace with your Supabase public key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Example function to get tasks
async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')  // table name should match the table in Supabase
    .select('*');
  
  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    console.log('Tasks fetched:', data);
  }
}
