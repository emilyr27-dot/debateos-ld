/*******************************
 * DebateOS – Cases System
 * Supports:
 * - Cases
 * - Topcases
 * - Blocks
 * - Folder organization
 *******************************/

const casesDiv = document.getElementById("cases");
const topcasesDiv = document.getElementById("topcases");
const blocksDiv = document.getElementById("blocks");

/* ============================
   Utility
============================ */

function now() {
  return Date.now();
}

/* ============================
   REGULAR LD CASES
============================ */

function saveCase() {
  const title = document.getElementById("title").value.trim();
  const value = document.getElementById("value").value.trim();
  const criterion = document.getElementById("criterion").value.trim();
  const contentionText = document.getElementById("content").value.trim();
  const folder = document.getElementById("folder")?.value.trim() || "Unsorted";

  if (!title) return alert("Case needs a title");

  const cases = getData("cases");

  cases.push({
    id: generateId(),
    type: "case",
    title,
    folder,
    side: "Aff",
    value,
    criterion,
    contentions: [
      {
        id: generateId(),
        tag: "Contention 1",
        text: contentionText,
        highlights: [],
        comments: []
      }
    ],
    createdAt: now(),
    updatedAt: now()
  });

  saveData("cases", cases);
  renderCases();
}

function renderCases(filterFolder = null) {
  if (!casesDiv) return;
  casesDiv.innerHTML = "";

  let cases = getData("cases");
  if (filterFolder) {
    cases = cases.filter(c => c.folder === filterFolder);
  }

  cases.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${c.title}</h4>
      <p><strong>Folder:</strong> ${c.folder}</p>
      <p><strong>Value:</strong> ${c.value || "—"}</p>
      <p><strong>Criterion:</strong> ${c.criterion || "—"}</p>
      <p><strong>${c.contentions[0]?.tag}</strong></p>
      <p>${c.contentions[0]?.text.slice(0, 120)}...</p>
    `;

    card.appendChild(actionButtons(() => editCase(c.id), () => deleteCase(c.id)));
    casesDiv.appendChild(card);
  });
}

function editCase(id) {
  const cases = getData("cases");
  const c = cases.find(c => c.id === id);
  if (!c) return;

  const newTitle = prompt("Edit case title:", c.title);
  if (!newTitle) return;

  c.title = newTitle;
  c.updatedAt = now();
  saveData("cases", cases);
  renderCases();
}

function deleteCase(id) {
  let cases = getData("cases");
  cases = cases.filter(c => c.id !== id);
  saveData("cases", cases);
  renderCases();
}

/* ============================
   TOPCASES
============================ */

function saveTopcase() {
  const title = document.getElementById("topcase-title").value.trim();
  const side = document.getElementById("topcase-side").value;
  const resolution = document.getElementById("topcase-resolution").value.trim();
  const intro = document.getElementById("topcase-intro").value.trim();
  const value = document.getElementById("topcase-value").value.trim();
  const criterion = document.getElementById("topcase-criterion").value.trim();
  const resAnalysis = document.getElementById("topcase-res-analysis").value.trim();
  const offcase = document.getElementById("topcase-offcase").value.trim();
  const folder = document.getElementById("topcase-folder")?.value.trim() || "Unsorted";

  if (!title) return alert("Topcase needs a title");

  const topcases = getData("topcases");

  topcases.push({
    id: generateId(),
    type: "topcase",
    title,
    folder,
    side,
    resolution,
    intro,
    value,
    criterion,
    resolutionalAnalysis: resAnalysis,
    offcaseArguments: offcase,
    createdAt: now(),
    updatedAt: now()
  });

  saveData("topcases", topcases);
  renderTopcases();
}

function renderTopcases(filterFolder = null) {
  if (!topcasesDiv) return;
  topcasesDiv.innerHTML = "";

  let topcases = getData("topcases");
  if (filterFolder) {
    topcases = topcases.filter(t => t.folder === filterFolder);
  }

  topcases.forEach(tc => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${tc.title} (${tc.side})</h4>
      <p><strong>Folder:</strong> ${tc.folder}</p>
      <p><strong>Value:</strong> ${tc.value || "—"}</p>
      <p><strong>Criterion:</strong> ${tc.criterion || "—"}</p>
    `;

    topcasesDiv.appendChild(card);
  });
}

/* ============================
   BLOCKS (AFF / NEG)
============================ */

function saveBlock() {
  const title = document.getElementById("block-title").value.trim();
  const side = document.getElementById("block-side").value;
  const blockType = document.getElementById("block-type").value;
  const text = document.getElementById("block-text").value.trim();
  const folder = document.getElementById("block-folder")?.value.trim() || "Unsorted";

  if (!title || !text) return alert("Block needs title and text");

  const blocks = getData("blocks");

  blocks.push({
    id: generateId(),
    type: "block",
    title,
    folder,
    side,
    blockType,
    text,
    createdAt: now()
  });

  saveData("blocks", blocks);
  renderBlocks();
}

function renderBlocks(filterFolder = null) {
  if (!blocksDiv) return;
  blocksDiv.innerHTML = "";

  let blocks = getData("blocks");
  if (filterFolder) {
    blocks = blocks.filter(b => b.folder === filterFolder);
  }

  blocks.forEach(b => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${b.title}</h4>
      <p><strong>Folder:</strong> ${b.folder}</p>
      <p><strong>Side:</strong> ${b.side}</p>
      <p><strong>Type:</strong> ${b.blockType}</p>
      <p>${b.text.slice(0, 100)}...</p>
    `;

    blocksDiv.appendChild(card);
  });
}

/* ============================
   Shared UI Helpers
============================ */

function actionButtons(editFn, deleteFn) {
  const wrapper = document.createElement("div");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = editFn;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = deleteFn;

  wrapper.appendChild(editBtn);
  wrapper.appendChild(delBtn);
  return wrapper;
}

/* ============================
   Initialize
============================ */

renderCases();
renderTopcases();
renderBlocks();
