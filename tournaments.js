// Simple Task Management and Calendar for Tournaments

// Get reference to the task list display area
const taskListDiv = document.getElementById("task-list");

// Fetch tasks from localStorage (or use an empty array if none exist)
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// Function to render tasks on the page
function renderTasks() {
  taskListDiv.innerHTML = ""; // Clear current list

  // Loop through tasks and create HTML for each task
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("card"); // Add styling to each task
    taskDiv.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.details}</p>
      <p>Date: ${task.date}</p>
    `;
    taskListDiv.appendChild(taskDiv); // Add task div to the list
  });
}

// Function to add a task to localStorage and re-render
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const date = document.getElementById("task-date").value.trim();
  const details = document.getElementById("task-details").value.trim();

  // Validate if all fields are filled
  if (!title || !date || !details) {
    return alert("Please fill in all fields.");
  }

  // Create a new task object
  const newTask = { title, date, details };

  // Push new task to the tasks array and save it in localStorage
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-render the task list
  renderTasks();
}

// Initial render of tasks when the page loads
renderTasks();
