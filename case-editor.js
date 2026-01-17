let cases = [];
let currentCase = null;

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

  // Populate fields
  document.getElementById("editor-title").value = currentCase.title;
  document.getElementById("editor-folder").value = currentCase.folder || "";
  document.getElementById("editor-side").value = currentCase.side;

  document.getElementById("editor-value").value = currentCase.value;
  document.getElementById("editor-criterion").value = currentCase.criterion;

  document.getElementById("editor-intro").value = currentCase.intro;
  document.getElementById("editor-res-analysis").value =
    currentCase.resolutionalAnalysis;
  document.getElementById("editor-offcase").value =
    currentCase.offcaseArguments;

  renderContentions();
  renderComments(); // 🔵 NEW
}

/* ============================
   SAVE CASE
============================ */

function saveCase() {
  currentCase.title = document.getElementById("editor-title").value.trim();
  currentCase.folder = document.getElementById("editor-folder").value.trim();
  currentCase.side = document.getElementById("editor-side").value;

  currentCase.value = document.getElementById("editor-value").value.trim();
  currentCase.criterion =
    document.getElementById("editor-criterion").value.trim();

  currentCase.intro = document.getElementById("editor-intro").value;
  currentCase.resolutionalAnalysis =
    document.getElementById("editor-res-analysis").value;
  currentCase.offcaseArguments =
    document.getElementById("editor-offcase").value;

  currentCase.updatedAt = Date.now();

  saveData("cases", cases);
  alert("Saved");
}

function goBack() {
  window.location.href = "cases.html";
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
      <input
        value="${con.tag}"
        onchange="updateContentionTag('${con.id}', this.value)"
      />

      <textarea
        rows="6"
        onchange="updateContentionText('${con.id}', this.value)"
      >${con.text}</textarea>

      <button onclick="addComment('contention', '${con.id}')">💬 Comment</button>
      <button onclick="deleteContention('${con.id}')">Delete</button>
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
