// ====== عرض الأسبوع ======
// ====== التقويم الشهري ======
const monthName = document.getElementById("monthName");
const daysContainer = document.querySelector(".calendar-days");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDay.getDay();

  monthName.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  daysContainer.innerHTML = "";

  // مسافات فاضية قبل أول يوم في الشهر
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    daysContainer.appendChild(empty);
  }

  // عرض الأيام الفعلية
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;

    if (
      day === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    daysContainer.appendChild(dayEl);
  }
}

renderCalendar();

// ====== التنقل بين الشهور ======
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  currentDate = new Date(currentYear, currentMonth);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  currentDate = new Date(currentYear, currentMonth);
  renderCalendar();
});

// ====== استرجاع بيانات القسم المختار ======
const selectedCategory = document.getElementById("selectedCategory");
const category = localStorage.getItem("selectedCategory");
const icon = localStorage.getItem("selectedIcon");

if (category && icon) {
  selectedCategory.innerHTML = `
    <i class="${icon}"></i>
    <span>${category}</span>
    <i class="fa-solid fa-chevron-right"></i>
  `;
}

/// ====== إنشاء التاسك ======
const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDesc");
const createBtn = document.getElementById("createTaskBtn");

createBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  const desc = taskDescInput.value.trim();

  if (!name || !desc) {
    alert("Please fill in all fields!");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  if (!tasks[category]) tasks[category] = [];

  tasks[category].push({
    name,
    desc,
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  alert("Task added successfully!");
  taskNameInput.value = "";
  taskDescInput.value = "";
  
  // ✅ بعد الحفظ يرجعك تلقائيًا لصفحة create.html
  window.location.href = "create.html";
});
