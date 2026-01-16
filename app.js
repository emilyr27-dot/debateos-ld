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
