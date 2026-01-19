const FUNCTION_URL =
  "https://cuzqxhwnmshkuuxclpkr.supabase.co/functions/v1/ai-assistant";

async function askAI() {
  const prompt = document.getElementById("prompt").value;
  const mode = document.getElementById("mode").value;
  const responseEl = document.getElementById("response");

  if (!prompt.trim()) {
    responseEl.textContent = "Please enter an argument first.";
    return;
  }

  responseEl.textContent = "Thinking...";

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, mode })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "AI request failed");
    }

    responseEl.textContent = data.reply;
  } catch (err) {
    responseEl.textContent = "Error: " + err.message;
  }
}

function goToDashboard() {
  window.location.href = "index.html";
}
