// Simple Task Management and Calendar for Tournaments

const taskListDiv = document.getElementById("task-list");
const calendarDiv = document.getElementById("calendar");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// Function to render tasks
function renderTasks() {
  taskListDiv.innerHTML = "";
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("card");
    taskDiv.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.details}</p>
      <p>Date: ${task.date}</p>
    `;
    taskListDiv.appendChild(taskDiv);
  });
}

// Function to render the calendar
function renderCalendar() {
  const today = new Date();
  const currentMonth = today.getMonth(); // Get current month
  const currentYear = today.getFullYear(); // Get current year

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get number of days in the month

  calendarDiv.innerHTML = ""; // Clear existing calendar

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
    dayTasks.forEach(task => {
      const taskEl = document.createElement("div");
      taskEl.style.fontSize = "12px";
      taskEl.textContent = "• " + task.title; // Task title
      dayDiv.appendChild(taskEl);
    });

    // Add a click listener to each day
    dayDiv.onclick = () => {
      // Prompt user for task details if clicking on an empty day or if no tasks are listed
      const title = prompt("Task title for " + dateKey);
      if (!title) return;

      const details = prompt("Task details?");
      if (!details) return;

      // Add the new task to the list and update localStorage
      tasks.push({ title, details, date: dateKey });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Re-render the calendar and tasks after adding the new task
      renderCalendar();
      renderTasks();
    };

    // Append the dayDiv to the calendarDiv
    calendarDiv.appendChild(dayDiv);
  }
}

// Function to add a new task (from the task form)
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value;
  const details = document.getElementById("task-details").value.trim();

  if (!title || !date || !details) {
    alert("Please fill in all fields");
    return;
  }

  // Push the new task to the tasks array and update localStorage
  tasks.push({ title, details, date });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-render tasks and calendar after adding a new task
  renderTasks();
  renderCalendar();
}

// Initial render of tasks and calendar
renderTasks();
renderCalendar();
