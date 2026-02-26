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

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? {...task, completed: !task.completed} : task
  );
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <strong>${task.name}</strong><br>
      Deadline: ${task.deadline}<br><br>
      <button onclick="toggleComplete(${task.id})">
        ${task.completed ? "Batal" : "Selesai"}
      </button>
    `;
    list.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  if(document.getElementById("totalTask")){
    document.getElementById("totalTask").textContent = total;
    document.getElementById("completedTask").textContent = completed;
    document.getElementById("pendingTask").textContent = pending;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.querySelector(".circle").style.background =
      `conic-gradient(#ff6f61 ${percent * 3.6}deg, #eee 0deg)`;
    document.getElementById("progressText").textContent = percent + "%";
  }
}

renderTasks();
updateStats();
