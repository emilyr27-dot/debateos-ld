let cases = [];
let currentCase = null;
let activeCommentSection = null;

/* ============================
   LOAD CASE
============================ */

function loadCase() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("id");
  if (!caseId) return alert("No case ID found");

  cases = getData("cases");
  currentCase = cases.find(c => c.id === caseId);
  if (!currentCase) return alert("Case not found");

  if (!currentCase.comments) currentCase.comments = [];

  document.getElementById("editor-title").value = currentCase.title || "";
  document.getElementById("editor-folder").value = currentCase.folder || "";
  document.getElementById("editor-side").value = currentCase.side || "Aff";
  document.getElementById("editor-value").value = currentCase.value || "";
  document.getElementById("editor-criterion").value = currentCase.criterion || "";
  document.getElementById("editor-intro").value = currentCase.intro || "";
  document.getElementById("editor-res-analysis").value =
    currentCase.resolutionalAnalysis || "";
  document.getElementById("editor-offcase").value =
    currentCase.offcaseArguments || "";

  renderContentions();
  renderComments();
}

/* ============================
   SAVE CASE
============================ */

function saveCase() {
  currentCase.title = document.getElementById("editor-title").value.trim();
  currentCase.folder = document.getElementById("editor-folder").value.trim();
  currentCase.side = document.getElementById("editor-side").value;
  currentCase.value = document.getElementById("editor-value").value.trim();
  currentCase.criterion = document.getElementById("editor-criterion").value.trim();
  currentCase.intro = document.getElementById("editor-intro").value;
  currentCase.resolutionalAnalysis =
    document.getElementById("editor-res-analysis").value;
  currentCase.offcaseArguments =
    document.getElementById("editor-offcase").value;

  currentCase.updatedAt = Date.now();
  saveData("cases", cases);
}

/* ============================
   SAVE + RETURN TO DASHBOARD
============================ */

function saveAndReturnToDashboard() {
  saveCase();

  // small delay ensures localStorage write completes
  setTimeout(() => {
    window.location.href = "index.html";
  }, 100);
}

/* ============================
   CONTENTIONS
============================ */

function renderContentions() {
  const container = document.getElementById("contentions");
  container.innerHTML = "";

  currentCase.contentions.forEach(con => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <input value="${con.tag}" onchange="con.tag=this.value" />
      <textarea rows="6" onchange="con.text=this.value">${con.text}</textarea>
    `;
    container.appendChild(div);
  });
}

function addContention() {
  currentCase.contentions.push({
    id: generateId(),
    tag: `Contention ${currentCase.contentions.length + 1}`,
    text: "",
    highlights: [],
    comments: []
  });
  renderContentions();
}

/* ============================
   COMMENTS – INLINE EDITOR
============================ */

function openCommentEditor(section) {
  activeCommentSection = section;
  document.getElementById("comment-draft").value = "";
  document.getElementById("comment-editor").style.display = "block";
}

function saveComment() {
  const text = document.getElementById("comment-draft").value.trim();
  if (!text) return;

  currentCase.comments.push({
    id: generateId(),
    section: activeCommentSection,
    text,
    archived: false,
    createdAt: Date.now()
  });

  saveData("cases", cases);
  closeCommentEditor();
  renderComments();
}

function closeCommentEditor() {
  document.getElementById("comment-editor").style.display = "none";
  activeCommentSection = null;
}

/* ============================
   COMMENT SIDEBAR
============================ */

function renderComments() {
  const list = document.getElementById("comments-list");
  list.innerHTML = "";

  const visible = currentCase.comments.filter(c => !c.archived);

  if (visible.length === 0) {
    list.innerHTML = "<p>No comments yet.</p>";
    return;
  }

  visible.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
      <strong>${c.section}</strong>
      <p>${c.text}</p>
      <small>${new Date(c.createdAt).toLocaleString()}</small>
      <div class="comment-actions">
        <button onclick="archiveComment('${c.id}')">Archive</button>
        <button onclick="deleteComment('${c.id}')">Delete</button>
      </div>
    `;

    list.appendChild(div);
  });
}

function deleteComment(id) {
  currentCase.comments = currentCase.comments.filter(c => c.id !== id);
  saveData("cases", cases);
  renderComments();
}

function archiveComment(id) {
  const c = currentCase.comments.find(c => c.id === id);
  if (c) c.archived = true;
  saveData("cases", cases);
  renderComments();
}

function toggleComments() {
  const panel = document.getElementById("comments-panel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}

/* ============================
   INIT
============================ */

loadCase();
