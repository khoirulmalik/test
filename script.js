document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Contoh validasi sederhana
    if (username === "superadmin" && password === "superpass") {
      window.location.href = "superadmin/dashboard/dashboard.html";
    } else if (username === "admin" && password === "adminpass") {
      window.location.href = "admin-divisi/dashboard-admin.html";
    } else if (username === "user" && password === "userpass") {
      window.location.href = "user/dashboard.html";
    } else {
      alert("Username atau password salah!");
    }
  });
