let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");

  if (taskInput.value === "" || deadlineInput.value === "") {
    alert("Isi semua field!");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskInput.value,
    deadline: deadlineInput.value,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  deadlineInput.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function getCountdown(deadline) {
  const now = new Date();
  const due = new Date(deadline);
  const diff = due - now;

  if (diff <= 0) return "Deadline lewat!";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} hari lagi`;
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
      ⏳ ${getCountdown(task.deadline)}<br><br>
      <button onclick="toggleComplete(${task.id})">Selesai</button>
      <button onclick="deleteTask(${task.id})">Hapus</button>
    `;

    list.appendChild(li);
  });
}

renderTasks();
