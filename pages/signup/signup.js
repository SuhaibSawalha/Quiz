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

function changePasswordState(suffix) {
  const password = document.getElementById(`password${suffix}`);
  const eye = document.getElementById(`show-password${suffix}`);
  if (password.type == "password") {
    password.type = "text";
    eye.innerHTML = `<i class="bi bi-eye" style="color: #234acd"></i>`;
  } else {
    password.type = "password";
    eye.innerHTML = `<i class="bi bi-eye-slash"></i>`;
  }
}

function SignUp() {
  const email = document.getElementById("email");
  const Email = email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const username = document.getElementById("username");
  const Username = username.value.trim();
  const password = document.getElementById("password");
  const Password = password.value;
  const passwordAgain = document.getElementById("password-again");
  const PasswordAgain = passwordAgain.value;
  email.style.border = "1px solid black";
  username.style.border = "1px solid black";
  document.getElementById("invalidUsername").innerHTML = ``;
  document.getElementById("invalidEmail").innerHTML = ``;
  password.style.border = "1px solid black";
  document.getElementById("invalidPassword").innerHTML = ``;
  passwordAgain.style.border = "1px solid black";
  document.getElementById("invalidPassword").innerHTML = ``;
  if (!emailRegex.test(Email)) {
    email.style.border = "1px solid red";
    document.getElementById("invalidEmail").innerHTML = `* invalid email`;
    return;
  }
  if (Username == "") {
    username.style.border = "1px solid red";
    document.getElementById("invalidUsername").innerHTML = `* invalid username`;
    return;
  }
  if (localStorage.getItem(`${Username}Data`)) {
    username.style.border = "1px solid red";
    document.getElementById(
      "invalidUsername"
    ).innerHTML = `* This username is taken`;
    return;
  }
  if (Password.length < 8) {
    password.style.border = "1px solid red";
    document.getElementById(
      "invalidPassword"
    ).innerHTML = `* password length should be at least 8`;
    return;
  }
  if (Password != PasswordAgain) {
    passwordAgain.style.border = "1px solid red";
    document.getElementById(
      "invalidPassword"
    ).innerHTML = `* passwords are not equal`;
    return;
  }
  const obj = {
    email: Email,
    password: Password,
    Quizzes: [],
    picture: "./../../img/profile.jpg",
  };
  localStorage.setItem("Login", Username);
  localStorage.setItem(`${Username}Data`, JSON.stringify(obj));
  gotoProfile();
}
