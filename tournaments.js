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
  const daysInMonth = new Date(2026, 1, 0).getDate(); // Example: February 2026
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  calendarDiv.innerHTML = ""; // Clear current calendar

  // Create a grid of days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("calendar-day");
    dayDiv.innerHTML = day;

    // Check if there are tasks for this day
    tasks.forEach(task => {
      const taskDate = new Date(task.date);
      if (taskDate.getDate() === day && taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear) {
        dayDiv.innerHTML += `<br><small>${task.title}</small>`;
      }
    });
    // Add a click listener to allow editing tasks for that day
    dayDiv.addEventListener("click", () => {
      const taskTitle = prompt("Enter task details for " + day + ":");
      if (taskTitle) {
        const taskDate = `${currentYear}-${currentMonth + 1}-${day}`;
        addTask(taskTitle, taskDate); // Add the task for the clicked day
      }
    });



    calendarDiv.appendChild(dayDiv);
  }
}

// Function to add a task
function addTask(title, date) {
  const details = prompt("Enter task details:");

  if (!title || !date || !details) return alert("Please fill in all fields.");

  const newTask = { title, date, details };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(); // Re-render tasks
  renderCalendar(); // Re-render calendar with new tasks
}


// Initial render of tasks and calendar
renderTasks();
renderCalendar();
