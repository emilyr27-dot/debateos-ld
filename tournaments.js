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
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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


// Initial render of tasks and calendar
renderTasks();
renderCalendar();
