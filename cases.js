/********************************
 * DebateOS – Cases Dashboard
 ********************************/

// ============================
// DOM REFERENCES
// ============================

const casesDiv = document.getElementById("cases");

// ============================
// DATA HELPERS
// ============================

function getFolders() {
  return getData("folders");
}

function saveFolders(folders) {
  saveData("folders", folders);
}

// ============================
// CREATE CASE
// ============================

function createCase() {
  const title = document.getElementById("title").value.trim();
  const folderName =
    document.getElementById("folder").value.trim() || "Unsorted";
  const side = document.getElementById("side").value;

  if (!title) return alert("Please enter a case title");

  // Load data
  const cases = getData("cases");
  let folders = getFolders();

  // Find or create folder
  let folder = folders.find(f => f.name === folderName);
  if (!folder) {
    folder = {
      id: generateId(),
      name: folderName,
      caseIds: []
    };
    folders.push(folder);
  }

  // Create case document
  const newCase = {
    id: generateId(),
    title,
    side,

    // Framework (single source of truth)
    value: "",
    criterion: "",

    // Topcase sections
    intro: "",
    resolutionalAnalysis: "",
    offcaseArguments: "",

    // Contentions
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

  // Save case
  cases.push(newCase);
  folder.caseIds.push(newCase.id);

  saveData("cases", cases);
  saveFolders(folders);

  // Open editor like Google Docs
  window.location.href = `case-editor.html?id=${newCase.id}`;
}

// ============================
// RENDER DASHBOARD
// ============================

function renderCases() {
  if (!casesDiv) return;
  casesDiv.innerHTML = "";

  const cases = getData("cases");
  const folders = getFolders();

  folders.forEach(folder => {
    const folderDiv = document.createElement("div");
    folderDiv.className = "card";

    const header = document.createElement("h3");
    header.textContent = folder.name;
    folderDiv.appendChild(header);

    folder.caseIds.forEach(caseId => {
      const c = cases.find(cs => cs.id === caseId);
      if (!c) return;

      const caseRow = document.createElement("div");
      caseRow.className = "case-row";

      caseRow.innerHTML = `
        <strong>${c.title}</strong> (${c.side})
      `;

      const openBtn = document.createElement("button");
      openBtn.textContent = "Open";
      openBtn.onclick = () =>
        window.location.href = `case-editor.html?id=${c.id}`;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteCase(c.id);

      caseRow.appendChild(openBtn);
      caseRow.appendChild(delBtn);
      folderDiv.appendChild(caseRow);
    });

    casesDiv.appendChild(folderDiv);
  });
}

// ============================
// DELETE CASE
// ============================

function deleteCase(caseId) {
  let cases = getData("cases");
  let folders = getFolders();

  cases = cases.filter(c => c.id !== caseId);

  folders.forEach(f => {
    f.caseIds = f.caseIds.filter(id => id !== caseId);
  });

  saveData("cases", cases);
  saveFolders(folders);
  renderCases();
}

// ============================
// INIT
// ============================

renderCases();
