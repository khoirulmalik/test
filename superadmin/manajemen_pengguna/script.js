let users = [
  {
    nip: "1001",
    name: "Tedi Wintoko",
    position: "Principal",
    division: "Teacher Division",
    unit: "High School",
    location: "Jakarta",
    email: "tedi@yayasan.com",
    username: "tediw",
    password: "password123",
    role: "Super Admin",
  },
  {
    nip: "1002",
    name: "Budi Santoso",
    position: "Admin Teacher Division",
    division: "Teacher Division",
    unit: "Middle School",
    location: "Surabaya",
    email: "budi@yayasan.com",
    username: "budi123",
    password: "securepass",
    role: "Admin",
  },
  {
    nip: "1003",
    name: "Ani Rahayu",
    position: "Admin HR Division",
    division: "HR Division",
    unit: "Elementary",
    location: "Jakarta",
    email: "ani@yayasan.com",
    username: "anir",
    password: "hrpass123",
    role: "Admin",
  },
  {
    nip: "1004",
    name: "Cahyo Pratama",
    position: "Admin Finance Division",
    division: "Finance Division",
    unit: "Kindergarten",
    location: "Surabaya",
    email: "cahyo@yayasan.com",
    username: "cahyop",
    password: "finance123",
    role: "Admin",
  },
  {
    nip: "1005",
    name: "Dewi Lestari",
    position: "Admin IT Division",
    division: "IT Division",
    unit: "High School",
    location: "Jakarta",
    email: "dewi@yayasan.com",
    username: "dewil",
    password: "marketing123",
    role: "Admin",
  },
  {
    nip: "1006",
    name: "Eko Prasetyo",
    position: "Admin Facility Division",
    division: "Facility Division",
    unit: "Middle School",
    location: "Surabaya",
    email: "eko@yayasan.com",
    username: "ekop",
    password: "sarana123",
    role: "Admin",
  },
  {
    nip: "1007",
    name: "Fajar Nugroho",
    position: "Math Teacher",
    division: "Teacher Division",
    unit: "High School",
    location: "Jakarta",
    email: "fajar@yayasan.com",
    username: "fajarn",
    password: "gurupass123",
    role: "User",
  },
  {
    nip: "1008",
    name: "Gita Permata",
    position: "HR Staff",
    division: "HR Division",
    unit: "Elementary",
    location: "Surabaya",
    email: "gita@yayasan.com",
    username: "gitap",
    password: "hrpass456",
    role: "User",
  },
];

// Generate dummy data for other users
for (let i = 9; i <= 50; i++) {
  users.push({
    nip: `10${i.toString().padStart(2, "0")}`,
    name: `User ${i}`,
    position:
      i % 5 === 0
        ? "HR Staff"
        : i % 4 === 0
        ? "Finance Staff"
        : i % 3 === 0
        ? "IT Admin"
        : i % 2 === 0
        ? "Facility Staff"
        : "Math Teacher",
    division:
      i % 5 === 0
        ? "HR Division"
        : i % 4 === 0
        ? "Finance Division"
        : i % 3 === 0
        ? "IT Division"
        : i % 2 === 0
        ? "Facility Division"
        : "Teacher Division",
    unit:
      i % 4 === 0
        ? "Kindergarten"
        : i % 3 === 0
        ? "Elementary"
        : i % 2 === 0
        ? "Middle School"
        : "High School",
    location: i % 2 === 0 ? "Jakarta" : "Surabaya",
    email: `user${i}@yayasan.com`,
    username: `user${i}`,
    password: `pass${i}123`,
    role: i % 5 === 0 ? "Admin" : "User", // Admin for specific divisions
  });
}
console.log(users);

// --- MODAL ---
let modal = document.getElementById("userModal");
let showFormBtn = document.getElementById("showFormBtn");
let closeBtn = document.querySelector(".close");

// Show modal to add user
showFormBtn.addEventListener("click", function () {
  modal.style.display = "flex";
  document.getElementById("formTitle").innerText = "Add User";
  document.getElementById("userForm").reset();
  document.getElementById("index").value = "";
});

// Close modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// --- PAGINATION & FILTERING ---
let filteredUsers = [...users];
let currentPage = 1;
let entriesPerPage = 10;

document
  .getElementById("entriesSelect")
  .addEventListener("change", function () {
    entriesPerPage = parseInt(this.value);
    currentPage = 1;
    renderUsers();
  });

document.getElementById("searchInput").addEventListener("input", function () {
  let query = this.value.toLowerCase();
  filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.position.toLowerCase().includes(query) ||
      user.division.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderUsers();
});

// Filter Role
document.getElementById("roleFilter").addEventListener("change", function () {
  applyFilters();
});

// Filter Location
document
  .getElementById("locationFilter")
  .addEventListener("change", function () {
    applyFilters();
  });

// Event listener for NIP filter
document.getElementById("nipFilter").addEventListener("input", function () {
  applyFilters();
});

// Event listener for division filter
document
  .getElementById("divisionFilter")
  .addEventListener("change", function () {
    applyFilters();
  });

// Event listener for unit filter
document.getElementById("unitFilter").addEventListener("change", function () {
  applyFilters();
});

function applyFilters() {
  let nipFilter = document.getElementById("nipFilter").value.toLowerCase();
  let divisionFilter = document.getElementById("divisionFilter").value;
  let unitFilter = document.getElementById("unitFilter").value;
  let roleFilter = document.getElementById("roleFilter").value;
  let locationFilter = document.getElementById("locationFilter").value;

  filteredUsers = users.filter((user) => {
    // Filter NIP
    let nipMatch = user.nip.toLowerCase().includes(nipFilter);

    // Filter Division
    let divisionMatch =
      divisionFilter === "" || user.division === divisionFilter;

    // Filter Unit
    let unitMatch = unitFilter === "" || user.unit === unitFilter;

    // Filter Role
    let roleMatch = roleFilter === "" || user.role === roleFilter;

    // Filter Location
    let locationMatch =
      locationFilter === "" || user.location === locationFilter;

    // Combine all filters with AND logic
    return nipMatch && divisionMatch && unitMatch && roleMatch && locationMatch;
  });

  // Reset to first page and re-render table
  currentPage = 1;
  renderUsers();
}

// Function to render the table
function renderUsers() {
  let userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";

  let start = (currentPage - 1) * entriesPerPage;
  let end = start + entriesPerPage;
  let paginatedUsers = filteredUsers.slice(start, end);

  if (paginatedUsers.length === 0 && currentPage > 1) {
    currentPage--;
    renderUsers();
    return;
  }

  paginatedUsers.forEach((user, index) => {
    let row = `<tr>
                  <td>${start + index + 1}</td>
                  <td>${user.nip}</td>
                  <td>${user.name}</td>
                  <td>${user.position}</td>
                  <td>${user.division}</td>
                  <td>${user.unit}</td>
                  <td>${user.location}</td>
                  <td>${user.email}</td>
                  <td>${user.username}</td>
                  <td>${user.password}</td>
                  <td>${user.role}</td>
                  <td>
                      <button onclick="editUser(${start + index})">Edit</button>
                      <button onclick="deleteUser(${
                        start + index
                      })">Delete</button>
                  </td>
              </tr>`;
    userTableBody.innerHTML += row;
  });

  document.getElementById("pageNumber").innerText = currentPage;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = end >= filteredUsers.length;
}
// --- PAGINATION EVENTS ---
document.getElementById("prevPage").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  if (currentPage * entriesPerPage < filteredUsers.length) {
    currentPage++;
    renderUsers();
  }
});

// --- SAVE DATA ---
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let index = document.getElementById("index").value;
  let newUser = {
    nip: document.getElementById("nip").value,
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    division: document.getElementById("division").value,
    unit: document.getElementById("unit").value,
    location: document.getElementById("location").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value,
  };
  if (index === "") {
    users.push(newUser);
  } else {
    users[index] = newUser;
  }
  modal.style.display = "none";
  filteredUsers = [...users];
  renderUsers();
});

// --- EDIT USER ---
function editUser(index) {
  let user = users[index];
  document.getElementById("index").value = index;
  document.getElementById("nip").value = user.nip;
  document.getElementById("name").value = user.name;
  document.getElementById("position").value = user.position;
  document.getElementById("division").value = user.division;
  document.getElementById("unit").value = user.unit;
  document.getElementById("location").value = user.location;
  document.getElementById("email").value = user.email;
  document.getElementById("username").value = user.username;
  document.getElementById("password").value = user.password;
  document.getElementById("role").value = user.role;

  document.getElementById("formTitle").innerText = "Edit User";
  modal.style.display = "flex";
}

// Function to delete user
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    filteredUsers = [...users];
    renderUsers();
  }
}

// Hamburger Menu
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
}

// Logout Function
function logout() {
  alert("You have been logged out.");
  window.location.href = "login.html";
}

// --- LOAD DATA ---
window.onload = renderUsers;
