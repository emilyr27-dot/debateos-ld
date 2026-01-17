// Shared storage utilities
function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Generate simple unique ID
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
function getFolders() {
  return getData("folders");
}

function saveFolders(folders) {
  saveData("folders", folders);
}

function createFolder(name) {
  const folders = getFolders();
  const folder = {
    id: generateId(),
    name,
    caseIds: []
  };
  folders.push(folder);
  saveFolders(folders);
  return folder;
}
/********************************
 * COMMENTS DATA HELPERS
 ********************************/

function getComments() {
  return getData("comments");
}

function saveComments(comments) {
  saveData("comments", comments);
}

