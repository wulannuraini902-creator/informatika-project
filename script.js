let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const name = document.getElementById("taskInput").value;
  const deadline = document.getElementById("deadlineInput").value;

  if (!name || !deadline) {
    alert("Isi semua field!");
    return;
  }

  tasks.push({
    id: Date.now(),
    name,
    deadline,
    completed: false
  });

  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("deadlineInput").value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? {...task, completed: !task.completed} : task
  );
  saveTasks();
  renderTasks();
}

function getRemainingDays(deadline) {
  const now = new Date();
  const due = new Date(deadline);
  const diff = due - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const circle = document.querySelector(".circle");
  circle.style.background = `conic-gradient(#00f5a0 ${percent * 3.6}deg, #ffffff33 0deg)`;
  document.getElementById("progressText").textContent = percent + "%";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const daysLeft = getRemainingDays(task.deadline);
    const warningClass = daysLeft <= 2 && !task.completed ? "warning" : "";

    li.innerHTML = `
      <div class="task-title">${task.name}</div>
      <div class="deadline ${warningClass}">
        ${daysLeft <= 0 ? "⚠️ Deadline lewat" : "⏳ " + daysLeft + " hari lagi"}
      </div>

      <div class="task-buttons">
        <button class="small-btn complete-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? "Batal" : "Selesai"}
        </button>
        <button class="small-btn delete-btn" onclick="deleteTask(${task.id})">
          Hapus
        </button>
      </div>
    `;

    list.appendChild(li);
  });

  updateProgress();
}

renderTasks();
