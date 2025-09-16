// -----------------------------
// Simulated Renewable Energy
// -----------------------------
function updateRenewable() {
  const renewableEl = document.getElementById("renewable");
  if (!renewableEl) return;

  // Generate a random renewable percentage between 30% - 90%
  const percentage = Math.floor(Math.random() * 60) + 30;
  renewableEl.textContent = percentage + " %";

  // Color-code based on value
  if (percentage >= 60) {
    renewableEl.style.color = "green";
  } else if (percentage >= 40) {
    renewableEl.style.color = "orange";
  } else {
    renewableEl.style.color = "red";
  }
}

// Call every 3 seconds
setInterval(updateRenewable, 3000);
updateRenewable(); // initial call

// -----------------------------
// Task Management
// -----------------------------
const tasks = [];

// Render tasks in the table
function renderTasks() {
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = "";

  if (tasks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="color:#777; font-style:italic;">No tasks added yet.</td></tr>';
    return;
  }

  tasks.forEach(task => {
    const row = document.createElement("tr");

    // Task Name
    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    // Duration
    const durationCell = document.createElement("td");
    durationCell.textContent = parseFloat(task.duration).toFixed(1);
    row.appendChild(durationCell);

    // Priority with badge
    const priorityCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = "priority-badge";
    badge.textContent = task.priority;

    // Color code based on priority
    switch (task.priority) {
      case "High":
        badge.style.backgroundColor = "red";
        badge.style.color = "white";
        break;
      case "Medium":
        badge.style.backgroundColor = "orange";
        badge.style.color = "white";
        break;
      case "Low":
        badge.style.backgroundColor = "green";
        badge.style.color = "white";
        break;
    }

    badge.style.padding = "2px 6px";
    badge.style.borderRadius = "4px";
    priorityCell.appendChild(badge);
    row.appendChild(priorityCell);

    tbody.appendChild(row);
  });
}

// Add task from form inputs
function addTask() {
  const nameInput = document.getElementById("name");
  const durationInput = document.getElementById("duration");
  const priorityInput = document.getElementById("priority");

  const name = nameInput.value.trim();
  const duration = durationInput.value.trim();
  const priority = priorityInput.value;

  if (!name || !duration || isNaN(duration) || Number(duration) <= 0) {
    alert("Please enter a valid task name and duration greater than 0.");
    return;
  }

  // Add to tasks array
  tasks.push({ name, duration: Number(duration), priority });

  // Clear inputs
  nameInput.value = "";
  durationInput.value = "";
  priorityInput.value = "Medium";
  nameInput.focus();

  // Re-render task list
  renderTasks();
}

// Initial render on page load
window.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  updateRenewable();
});