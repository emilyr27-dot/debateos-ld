const casesDiv = document.getElementById("cases");

// Load and display saved cases
function renderCases() {
  casesDiv.innerHTML = "";
  const cases = getData("cases");

  cases.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    
    const title = document.createElement("h4");
    title.textContent = c.title;
    div.appendChild(title);

    const content = document.createElement("p");
    content.textContent = c.content;
    div.appendChild(content);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editCase(c.id);
    div.appendChild(editBtn);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteCase(c.id);
    div.appendChild(delBtn);

    casesDiv.appendChild(div);
  });
}

// Save a new case
function saveCase() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (!title || !content) return alert("Please enter title and content");

  const cases = getData("cases");
  cases.push({ id: generateId(), title, content });
  saveData("cases", cases);

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  renderCases();
}

// Delete a case
function deleteCase(id) {
  let cases = getData("cases");
  cases = cases.filter(c => c.id !== id);
  saveData("cases", cases);
  renderCases();
}

// Edit a case
function editCase(id) {
  const cases = getData("cases");
  const c = cases.find(c => c.id === id);
  if (!c) return;

  const newTitle = prompt("Edit case title:", c.title);
  const newContent = prompt("Edit case content:", c.content);
  if (newTitle && newContent) {
    c.title = newTitle;
    c.content = newContent;
    saveData("cases", cases);
    renderCases();
  }
}

// Initialize page
renderCases();
