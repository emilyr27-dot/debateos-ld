// Rankings and Feedback Management

const feedbackListDiv = document.getElementById("feedback-list");

let feedbackList = JSON.parse(localStorage.getItem("feedback") || "[]");

// Function to render feedback list
function renderFeedbackList() {
  feedbackListDiv.innerHTML = "";
  feedbackList.forEach(feedback => {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("card");
    feedbackDiv.innerHTML = `
      <h4>${feedback.opponentName} vs ${feedback.judgeName}</h4>
      <p>Placement: ${feedback.placement}</p>
      <p>Feedback: ${feedback.feedback}</p>
    `;
    feedbackListDiv.appendChild(feedbackDiv);
  });
}

// Function to save round feedback
function saveRoundFeedback() {
  const opponentName = document.getElementById("opponent-name").value.trim();
  const judgeName = document.getElementById("judge-name").value.trim();
  const placement = document.getElementById("placement").value.trim();
  const feedback = document.getElementById("feedback").value.trim();

  if (!opponentName || !judgeName || !placement || !feedback) {
    alert("Please fill in all fields.");
    return;
  }

  const newFeedback = { opponentName, judgeName, placement, feedback };
  feedbackList.push(newFeedback);
  localStorage.setItem("feedback", JSON.stringify(feedbackList));

  renderFeedbackList(); // Re-render feedback
}

// Initial render of saved feedback
renderFeedbackList();
