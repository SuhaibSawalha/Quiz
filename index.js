let Username = "";
if (localStorage.getItem("Login")) {
  Username = localStorage.getItem("Login");
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-danger" style="margin-left: 80px" onclick="Logout(1)">Logout</button>
  `;
} else {
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-secondary" onclick="gotoSignup(1)">
        Sign up
    </button>
    <button class="btn btn-primary" onclick="gotoLogin(1)">Login</button>
  `;
}
