let Username = "";
if (localStorage.getItem("Login")) {
  Username = localStorage.getItem("Login");
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-danger" style="margin-left: 80px" onclick="Logout(0)">Logout</button>
  `;
} else {
  gotoLogin();
}

const user = JSON.parse(localStorage.getItem(`${Username}Data`));
document.getElementById("ProfilePicture").src = user.picture;

function NumberOfQuizzes() {
  let cnt = 0;
  user.Quizzes.forEach((element) => {
    cnt += element.author == Username;
  });
  return cnt;
}
function SolvedQuizzes() {
  let cnt = 0;
  user.Quizzes.forEach((element) => {
    cnt += element.taken;
  });
  return cnt;
}
function FullQuizzes() {
  let cnt = 0;
  user.Quizzes.forEach((element) => {
    cnt += element.score == element.questions.length;
  });
  return cnt;
}

document.getElementById("information").innerHTML = `
  <p style="font-size: ${
    600 / Username.length
  }px; margin-bottom: 0">${Username}</p>
  <p style="font-weight: 1">${user.email}</p>
  <p><span style="color: blue" onclick="gotoMyQuizzes()">My Quizzes:</span> &nbsp ${NumberOfQuizzes()}</p>
  <p><span style="color: blue" onclick="gotoAllQuizzesFilterd(0)">Solved Quizzes:</span> &nbsp ${SolvedQuizzes()}</p>
  <p><span style="color: blue" onclick="gotoAllQuizzesFilterd(1)">Full Quizzes:</span> &nbsp ${FullQuizzes()}</p>
`;

var imageInput = document.getElementById("imageInput");

var imageDataUrl = "";
imageInput.addEventListener("change", function (event) {
  var selectedFile = event.target.files[0];
  if (selectedFile) {
    var reader = new FileReader();
    reader.onload = function (e) {
      imageDataUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});

function Upload() {
  if (imageDataUrl == "") {
    alert("please select a picture");
    return;
  }
  user.picture = imageDataUrl;
  imageDataUrl = "";
  document.getElementById("ProfilePicture").src = user.picture;
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
  document.getElementById("change-unset").style.display = "block";
  document.querySelector("input").value = "";
  document.querySelector("input").style.display = "none";
  document.getElementById("upload").style.display = "none";
}

function changePhoto() {
  document.getElementById("change-unset").style.display = "none";
  document.querySelector("input").style.display = "block";
  document.getElementById("upload").style.display = "block";
}

function unsetPhoto() {
  const confirm = window.confirm("Are you sure you want to reset the picture?");
  if (confirm) {
    user.picture = "./../../img/profile.jpg";
    localStorage.setItem(`${Username}Data`, JSON.stringify(user));
    document.getElementById("ProfilePicture").src = user.picture;
  }
}
