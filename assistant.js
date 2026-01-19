const FUNCTION_URL =
  "https://cuzqxhwnmshkuuxclpkr.supabase.co/functions/v1/ai-assistant";

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
  chatBox.innerHTML += `<p><em>AI is thinking...</em></p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  inputEl.value = "";

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        mode: "refine"
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "AI request failed");
    }

    // Remove "thinking..."
    chatBox.lastElementChild.remove();

    // Show AI reply
    chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `<p style="color:red;">Error: ${err.message}</p>`;
  }
}

function goToDashboard() {
  window.location.href = "index.html";
}
