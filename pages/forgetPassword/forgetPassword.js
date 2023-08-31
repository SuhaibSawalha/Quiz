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
  const username = document.getElementById("username");
  const Username = username.value.trim();
  let user = localStorage.getItem(`${Username}Data`);
  if (user) {
    username.style.border = "1px solid black";
    document.getElementById("invalidUsername").innerHTML = ``;
  } else {
    username.style.border = "1px solid red";
    document.getElementById(
      "invalidUsername"
    ).innerHTML = `* username doesn't exist`;
    return;
  }
  user = JSON.parse(user);
  if (user.email == Email) {
    email.style.border = "1px solid black";
    document.getElementById("invalidEmail").innerHTML = ``;
  } else {
    email.style.border = "1px solid red";
    document.getElementById("invalidEmail").innerHTML = `* email is incorrect`;
    return;
  }
  const password = document.getElementById("password");
  const Password = password.value;
  if (Password.length >= 8) {
    password.style.border = "1px solid black";
    document.getElementById("invalidPassword").innerHTML = ``;
  } else {
    password.style.border = "1px solid red";
    document.getElementById(
      "invalidPassword"
    ).innerHTML = `* password length should be at least 8`;
    return;
  }
  const passwordAgain = document.getElementById("password-again");
  const PasswordAgain = passwordAgain.value;
  if (Password == PasswordAgain) {
    passwordAgain.style.border = "1px solid black";
    document.getElementById("invalidPassword").innerHTML = ``;
  } else {
    passwordAgain.style.border = "1px solid red";
    document.getElementById(
      "invalidPassword"
    ).innerHTML = `* passwords are not equal`;
    return;
  }
  user.password = Password;
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
  gotoProfile();
}
