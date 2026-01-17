// Simple Task Management and Calendar for Tournaments

const taskListDiv = document.getElementById("task-list");
const calendarDiv = document.getElementById("calendar");
const archiveListDiv = document.getElementById("archive-list"); // For displaying archived tasks

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let archivedTasks = JSON.parse(localStorage.getItem("archivedTasks") || "[]");

// Function to render tasks in the task list section
function renderTasks() {
  taskListDiv.innerHTML = "";
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("card");
    taskDiv.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.details}</p>
      <p>Date: ${task.date}</p>
      <button onclick="archiveTask('${task.date}')">Archive</button>
    `;
    taskListDiv.appendChild(taskDiv);
  });
}

// Function to render the calendar
function renderCalendar() {
  const today = new Date();
  const currentMonth = today.getMonth(); // Get current month (0-11)
  const currentYear = today.getFullYear(); // Get current year (yyyy)
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get number of days in the month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[currentMonth]; // Name of the current month
  
  calendarDiv.innerHTML = ""; // Clear existing calendar

  // Add month name to the top of the calendar
  const monthHeader = document.createElement("h3");
  monthHeader.innerHTML = `${monthName} ${currentYear}`;
  calendarDiv.appendChild(monthHeader);

  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day"; // Add class for styling
    dayDiv.innerHTML = `<strong>${day}</strong>`; // Display day number

    // Format date for comparison (YYYY-MM-DD)
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Filter tasks for the specific date
    const dayTasks = tasks.filter(t => t.date === dateKey);

    // Display the tasks associated with that day
    dayTasks.forEach((task, index) => {
      const taskEl = document.createElement("div");
      taskEl.style.fontSize = "12px";
      taskEl.textContent = "• " + task.title; // Task title

      // Add a click listener to each task for editing or deleting
      taskEl.onclick = () => {
        const action = prompt("Edit or delete this task? Type 'edit' to edit, 'delete' to remove, or 'cancel' to close.");

        if (action === "edit") {
          const newTitle = prompt("Enter new task title:", task.title);
          const newDetails = prompt("Enter new task details:", task.details);
          
          // Update task with new values
          if (newTitle && newDetails) {
            tasks[index] = { ...task, title: newTitle, details: newDetails };
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderCalendar(); // Re-render calendar after edit
            renderTasks(); // Re-render task list
          }
        } else if (action === "delete") {
          // Remove task from the list
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderCalendar(); // Re-render calendar after deletion
          renderTasks(); // Re-render task list
        }
      };

      dayDiv.appendChild(taskEl);
    });

    // Add a click listener to each day to allow task creation
    dayDiv.onclick = () => {
      // Prompt user for task title and details if no tasks exist for that day
      const title = prompt("Task title for " + dateKey);
      if (!title) return;

      const details = prompt("Task details?");
      if (!details) return;

      // Add new task
      tasks.push({ title, details, date: dateKey });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderCalendar(); // Re-render calendar with new task
      renderTasks(); // Re-render task list with new task
    };

    // Append the dayDiv to the calendarDiv
    calendarDiv.appendChild(dayDiv);
  }
}

// Function to add a task (from the input fields)
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value;
  const details = document.getElementById("task-details").value.trim();

  if (!title || !date || !details) {
    alert("Please fill in all fields");
    return;
  }

  tasks.push({ title, details, date });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  renderCalendar();
}

// Function to archive a task
function archiveTask(date) {
  const taskIndex = tasks.findIndex(task => task.date === date);
  if (taskIndex === -1) return alert("Task not found!");

  const task = tasks.splice(taskIndex, 1)[0]; // Remove task from current tasks

  // Add archived task with the current date of archiving
  const archivedTask = {
    ...task,
    archivedDate: new Date().toLocaleDateString(), // Store archive date
  };

  archivedTasks.push(archivedTask);
  localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks)); // Save archived tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update tasks in localStorage
  
  renderCalendar(); // Re-render calendar after archiving
  renderTasks(); // Re-render task list after archiving
  renderArchive(); // Re-render archive list
}

// Function to render the archived tasks
function renderArchive() {
  archiveListDiv.innerHTML = "";
  archivedTasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("card");
    taskDiv.innerHTML = `
      <h4>${task.title}</h4>
      <p>Archived on: ${task.archivedDate}</p>
      <p>${task.details}</p>
    `;
    archiveListDiv.appendChild(taskDiv);
  });
}

// Initial render of tasks, calendar, and archived tasks
renderTasks();
renderCalendar();
renderArchive();
