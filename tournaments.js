// Simple Task Management and Calendar for Tournaments

const taskListDiv = document.getElementById("task-list");
const calendarDiv = document.getElementById("calendar");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let archivedTasks = JSON.parse(localStorage.getItem("archivedTasks") || "[]");

// Function to render tasks (including Archive and Delete buttons)
function renderTasks() {
  taskListDiv.innerHTML = ""; // Clear the current task list

  // Group tasks by folder
  const groupedTasks = {
    Research: [],
    Practice: [],
    Tournaments: [],
  };

  // Loop through all tasks and group them by folder
  tasks.forEach(task => {
    if (groupedTasks[task.folder]) {
      groupedTasks[task.folder].push(task);
    }
  });

  // Create sections for each folder
  Object.keys(groupedTasks).forEach(folder => {
    if (groupedTasks[folder].length > 0) {
      const folderDiv = document.createElement("div");
      folderDiv.classList.add("folder-section");

      const folderHeader = document.createElement("h3");
      folderHeader.innerText = folder; // Folder name (e.g., "Research")
      folderDiv.appendChild(folderHeader);

      // Create a list of tasks for this folder
      groupedTasks[folder].forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("card");
        taskDiv.innerHTML = `
          <h4>${task.title}</h4>
          <p>${task.details}</p>
          <p>Date: ${task.date}</p>
        `;
        folderDiv.appendChild(taskDiv);
      });

      taskListDiv.appendChild(folderDiv);
    }
  });
}


// Function to archive a task (move it to archivedTasks)
function archiveTask(index) {
  const taskToArchive = tasks.splice(index, 1)[0];
  archivedTasks.push(taskToArchive);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  renderTasks();
}

// Function to delete a task (remove it permanently)
function deleteTask(index) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);
  
  // Update localStorage and re-render the task list
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  // Re-render the tasks and calendar after deletion
  renderTasks();
  renderCalendar();
}

// Function to render the calendar (including the month name)
function renderCalendar() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Display the name of the current month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNameDiv = document.getElementById("month-name");
  monthNameDiv.innerHTML = `${monthNames[currentMonth]} ${currentYear}`;

  calendarDiv.innerHTML = "";

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.innerHTML = `<strong>${day}</strong>`;

    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const dayTasks = tasks.filter(t => t.date === dateKey);

    dayTasks.forEach(task => {
      const taskEl = document.createElement("div");
      taskEl.style.fontSize = "12px";
      taskEl.textContent = "• " + task.title;
      dayDiv.appendChild(taskEl);
    });

    dayDiv.onclick = () => {
      const title = prompt("Task title for " + dateKey);
      if (!title) return;

      const details = prompt("Task details?");
      if (!details) return;

      tasks.push({ title, details, date: dateKey });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderCalendar();
      renderTasks();
    };

    calendarDiv.appendChild(dayDiv);
  }
}

// Function to add a task
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value;
  const details = document.getElementById("task-details").value.trim();
  const folder = document.getElementById("task-folder").value; // New code to grab folder

  if (!title || !date || !details || !folder) {
    alert("Please fill in all fields, including selecting a folder.");
    return;
  }

  tasks.push({ title, details, date, folder }); // Store folder in the task
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  renderCalendar();
}

// Initial render of tasks and calendar
renderTasks();
renderCalendar();
