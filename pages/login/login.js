let Username = "";
if (localStorage.getItem("Login")) {
  gotoProfile();
} else {
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-secondary" onclick="gotoSignup(0)">
        Sign up
    </button>
    <button class="btn btn-primary" onclick="gotoLogin(0)">Login</button>
  `;
}

function changePasswordState() {
  const password = document.getElementById("password");
  const eye = document.getElementById("showPassword");
  if (password.type == "password") {
    password.type = "text";
    eye.innerHTML = `<i class="bi bi-eye" style="color: #234acd"></i>`;
  } else {
    password.type = "password";
    eye.innerHTML = `<i class="bi bi-eye-slash"></i>`;
  }
}

function Login() {
  const username = document.getElementById("username");
  const Username = username.value.trim();
  const password = document.getElementById("password");
  const Password = password.value;
  if (localStorage.getItem(`${Username}Data`)) {
    document.getElementById("invalid").innerHTML = "";
  } else {
    document.getElementById("invalid").innerHTML = "* username doesn't exist";
    return;
  }
  const obj = JSON.parse(localStorage.getItem(`${Username}Data`));
  if (Password == obj.password) {
    document.getElementById("invalid").innerHTML = "";
  } else {
    document.getElementById("invalid").innerHTML = "* password isn't correct";
    return;
  }
  localStorage.setItem("Login", Username);
  gotoProfile();
}
