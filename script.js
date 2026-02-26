let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const name = document.getElementById("taskInput").value;
  const deadline = document.getElementById("deadlineInput").value;

  if (name === "" || deadline === "") {
    alert("Isi semua field!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    deadline,
    completed: false
  };

  tasks.push(task);
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
  tasks = tasks.map(task => {
    if (task.id === id) task.completed = !task.completed;
    return task;
  });

  saveTasks();
  renderTasks();
}

function getCountdown(deadline) {
  const now = new Date();
  const due = new Date(deadline);
  const diff = due - now;

  if (diff <= 0) return "⚠️ Deadline lewat";

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `⏳ ${days} hari lagi`;
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById("totalTask").textContent = total;
  document.getElementById("completedTask").textContent = completed;

  const progressPercent = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById("progress").style.width = progressPercent + "%";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <strong>${task.name}</strong><br>
      Deadline: ${task.deadline}<br>
      ${getCountdown(task.deadline)}

      <div class="task-buttons">
        <button class="small-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? "Batal" : "Selesai"}
        </button>
        <button class="small-btn" onclick="deleteTask(${task.id})">
          Hapus
        </button>
      </div>
    `;

    list.appendChild(li);
  });

  updateStats();
}

renderTasks();
