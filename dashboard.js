// ===== Date in Header =====
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const today = new Date();
const day = today.getDate();
const month = months[today.getMonth()];

document.getElementById("date").textContent = `${day} ${month}`;

// ===== Week Cards =====
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekContainer = document.getElementById("week");

days.forEach((dayName, index) => {
  const date = new Date();
  date.setDate(today.getDate() - today.getDay() + index);

  const dayNumber = date.getDate();

  const card = document.createElement("div");
  card.classList.add("day-card");
  if (index === today.getDay()) {
    card.classList.add("today");
  }

  card.innerHTML = `
    <p>${dayNumber}</p>
    <h3>${dayName}</h3>
  `;

  weekContainer.appendChild(card);
});

// ===== Tasks Logic =====
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById("addBtn");
  const taskForm = document.getElementById("taskForm");
  const saveTask = document.getElementById("saveTask");
  const cancelTask = document.getElementById("cancelTask");
  const tasksContainer = document.getElementById("tasksContainer");
  const taskCount = document.getElementById("taskCount");

  function updateCount() {
    const activeTasks = tasksContainer.querySelectorAll(".task-item:not(.done)").length;
    taskCount.textContent = activeTasks;
  }

  addBtn.addEventListener("click", () => {
    taskForm.style.display = "block";
  });

  cancelTask.addEventListener("click", () => {
    taskForm.style.display = "none";
  });

  saveTask.addEventListener("click", () => {
    const time = document.getElementById("taskTime").value.trim();
    const dept = document.getElementById("taskDept").value.trim();
    const note = document.getElementById("taskNote").value.trim();

    if (time === "" && dept === "" && note === "") {
      alert("من فضلك اكتب بيانات المهمة");
      return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";

    taskDiv.innerHTML = `
      <div class="task-content">
        <div class="task-main">
          <div class="task-left">
            <span class="task-time">${time}</span>
          </div>
          <div class="task-center">
            <span class="task-dept">${dept}</span>
            <div class="task-note">${note}</div>
          </div>
        </div>
      </div>
      <input type="checkbox" class="task-check">
    `;

    // checkbox event
    const check = taskDiv.querySelector(".task-check");
    check.addEventListener("change", () => {
      if (check.checked) {
        taskDiv.classList.add("done");
      } else {
        taskDiv.classList.remove("done");
      }
      updateCount(); 
    });

    tasksContainer.appendChild(taskDiv);

    updateCount();

    document.getElementById("taskTime").value = "";
    document.getElementById("taskDept").value = "";
    document.getElementById("taskNote").value = "";
    taskForm.style.display = "none";
  });
});

