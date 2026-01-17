/********************************
 * DebateOS – Case System v2
 * One case = one document
 ********************************/

const casesDiv = document.getElementById("cases");

/* ============================
   CREATE CASE (DOC)
============================ */

function createCase() {
  const title = document.getElementById("title").value.trim();
  const folder = document.getElementById("folder").value.trim() || "Unsorted";
  const side = document.getElementById("side").value;

  if (!title) return alert("Case needs a title");

  const cases = getData("cases");

  const newCase = {
    id: generateId(),
    title,
    folder,
    side,

    // Framework (single source of truth)
    value: "",
    criterion: "",

    // Topcase-style sections
    intro: "",
    resolutionalAnalysis: "",
    offcaseArguments: "",

    // Contentions (start with one)
    contentions: [
      {
        id: generateId(),
        tag: "Contention 1",
        text: "",
        highlights: [],
        comments: []
      }
    ],

    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  cases.push(newCase);
  saveData("cases", cases);

  // Open like Google Docs
  window.location.href = `case-editor.html?id=${newCase.id}`;
}

/* ============================
   RENDER CASE LIST
============================ */

function renderCases() {
  if (!casesDiv) return;
  casesDiv.innerHTML = "";

  const cases = getData("cases");

  cases.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${c.title}</h4>
      <p><strong>Folder:</strong> ${c.folder}</p>
      <p><strong>Side:</strong> ${c.side}</p>
      <p><strong>Contentions:</strong> ${c.contentions.length}</p>
    `;

    const openBtn = document.createElement("button");
    openBtn.textContent = "Open";
    openBtn.onclick = () =>
      window.location.href = `case-editor.html?id=${c.id}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteCase(c.id);

    card.appendChild(openBtn);
    card.appendChild(delBtn);
    casesDiv.appendChild(card);
  });
}

/* ============================
   DELETE CASE
============================ */

function deleteCase(id) {
  let cases = getData("cases");
  cases = cases.filter(c => c.id !== id);
  saveData("cases", cases);
  renderCases();
}

/* ============================
   INIT
============================ */

renderCases();
