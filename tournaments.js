// Tournament Task Management with Calendar, Folders, Delete & Archive

const taskListDiv = document.getElementById("task-list");
const calendarDiv = document.getElementById("calendar");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let archivedTasks = JSON.parse(localStorage.getItem("archivedTasks") || "[]");

// --- RENDER TASKS FUNCTION ---
function renderTasks() {
  taskListDiv.innerHTML = ""; // Clear task list

  // Group tasks by folder
  const groupedTasks = {};
  tasks.forEach(task => {
    const folder = task.folder || "Unsorted";
    if (!groupedTasks[folder]) groupedTasks[folder] = [];
    groupedTasks[folder].push(task);
  });

  // Render each folder
  Object.keys(groupedTasks).forEach(folder => {
    const folderDiv = document.createElement("div");
    folderDiv.classList.add("folder-section");

    const folderHeader = document.createElement("h3");
    folderHeader.innerText = folder;
    folderDiv.appendChild(folderHeader);

    groupedTasks[folder].forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("card");
      taskDiv.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.details}</p>
        <p>Date: ${task.date}</p>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="archiveTask(${index})">Archive</button>
      `;
      folderDiv.appendChild(taskDiv);
    });

    taskListDiv.appendChild(folderDiv);
  });
}

// --- DELETE TASK ---
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderCalendar();
}

// --- ARCHIVE TASK ---
function archiveTask(index) {
  const task = tasks.splice(index, 1)[0];
  archivedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  renderTasks();
  renderCalendar();
}

// --- RENDER CALENDAR ---
function renderCalendar() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Display current month
  let monthNameDiv = document.getElementById("month-name");
  if (!monthNameDiv) {
    monthNameDiv = document.createElement("h3");
    monthNameDiv.id = "month-name";
    calendarDiv.parentNode.insertBefore(monthNameDiv, calendarDiv);
  }
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  monthNameDiv.innerHTML = `${monthNames[currentMonth]} ${currentYear}`;

  calendarDiv.innerHTML = "";

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.innerHTML = `<strong>${day}</strong>`;

    const dateKey = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    // Show tasks for this day
    tasks.filter(t => t.date === dateKey).forEach(task => {
      const taskEl = document.createElement("div");
      taskEl.style.fontSize = "12px";
      taskEl.textContent = "• " + task.title;
      dayDiv.appendChild(taskEl);
    });

    // Click to add task directly from calendar
    dayDiv.onclick = () => {
      const title = prompt("Task title for " + dateKey);
      if (!title) return;
      const details = prompt("Task details?");
      if (!details) return;
      const folder = prompt("Folder name (Research, Practice, Tournaments, etc.)") || "Unsorted";

      tasks.push({ title, details, date: dateKey, folder });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      renderCalendar();
    };

    calendarDiv.appendChild(dayDiv);
  }
}

// --- ADD TASK FROM FORM ---
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value;
  const details = document.getElementById("task-details").value.trim();
  const folderInput = document.getElementById("task-folder");
  const folder = folderInput ? folderInput.value.trim() || "Unsorted" : "Unsorted";

  if (!title || !date || !details) {
    alert("Please fill in all fields.");
    return;
  }

  tasks.push({ title, details, date, folder });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderCalendar();
}

// --- INITIAL RENDER ---
renderTasks();
renderCalendar();
