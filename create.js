
const today = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekContainer = document.getElementById("week");

if (weekContainer) {
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
}

// ======  localStorage ======
let storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
const categories = ["Idea", "Food", "Work", "Sport", "Music"];

function updateTaskCounts() {
  document.querySelector(".idea-count").textContent = `${(storedTasks.Idea || []).length} Tasks`;
  document.querySelector(".food-count").textContent = `${(storedTasks.Food || []).length} Tasks`;
  document.querySelector(".work-count").textContent = `${(storedTasks.Work || []).length} Tasks`;
  document.querySelector(".sport-count").textContent = `${(storedTasks.Sport || []).length} Tasks`;
  document.querySelector(".music-count").textContent = `${(storedTasks.Music || []).length} Tasks`;
}
updateTaskCounts();

const links = document.querySelectorAll(".activity-card a");

links.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault(); // نوقف الانتقال المؤقت

    const card = event.target.closest(".activity-card");
    const category = card.querySelector("h3").textContent.trim();
    const icon = card.querySelector("i").classList.value;

    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("selectedIcon", icon);

    window.location.href = link.getAttribute("href");
  });
});

