const FUNCTION_URL =
  "https://cuzqxhwnmshkuuxclpkr.supabase.co/functions/v1/ai-assistant";

// ⬇️ PASTE YOUR *ANON PUBLIC KEY* FROM SUPABASE HERE
const SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1enF4aHdubXNoa3V1eGNscGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MjgxNzEsImV4cCI6MjA4NDIwNDE3MX0.Zn_71T7-cVrKCVMLtvPXpqX9Ox0Nm5UiyuZHoKRHqJQ;

async function askAI() {
  const inputEl = document.getElementById("prompt");
  const chatBox = document.getElementById("chat-box");

  if (!inputEl || !chatBox) {
    console.error("Missing required HTML elements");
    return;
  }

  const prompt = inputEl.value.trim();
  if (!prompt) return;

  // Show user message
  chatBox.innerHTML += `<p><strong>You:</strong> ${prompt}</p>`;
  const thinkingEl = document.createElement("p");
  thinkingEl.innerHTML = "<em>AI is thinking...</em>";
  chatBox.appendChild(thinkingEl);
  chatBox.scrollTop = chatBox.scrollHeight;

  inputEl.value = "";

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        prompt,
        mode: "refine"
      })
    });

    const data = await res.json();

    // Remove "thinking..."
    thinkingEl.remove();

    if (!res.ok) {
      throw new Error(data.error || "AI request failed");
    }

    // Show AI reply
    chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    thinkingEl.remove();
    chatBox.innerHTML += `<p style="color:red;">Error: ${err.message}</p>`;
  }
}

function goToDashboard() {
  window.location.href = "index.html";
}
