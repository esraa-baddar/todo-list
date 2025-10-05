document.addEventListener("DOMContentLoaded", function() {
  const users = [
    { email: "esraa@gmail.com", password: "1234" },
    { email: "user2@example.com", password: "abcd" }
  ];

  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("error");

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const found = users.find(user => user.email === email && user.password === password);

    if(found){
      localStorage.setItem("loggedInUser", JSON.stringify({ email: found.email }));
      window.location.href = "dashboard.html";
    } else {
      errorEl.style.display = "block";
      setTimeout(() => errorEl.style.display = "none", 2500);
    }
  });})
localStorage.setItem("tasks", JSON.stringify(tasksArray));

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
taskElement.addEventListener('click', () => {
  taskElement.classList.toggle('completed');
});



