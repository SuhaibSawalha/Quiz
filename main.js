if (!localStorage.getItem("Sort")) {
  localStorage.setItem("Sort", "all");
}
if (!localStorage.getItem("Quizzes")) {
  localStorage.setItem("QuizID", 1);
  Quizzes = [];
  Quizzes.push({
    id: 0,
    author: "",
    title: "Suhaib's Quiz",
    questions: [
      {
        id: 1,
        title: "Who's the developer of this amazing website?",
        choices: [
          { id: 1, title: "Suhaib Sawalha", correct: 1, choosen: 0 },
          { id: 2, title: "Elon Musk", correct: 0, choosen: 0 },
          { id: 3, title: "Bill Gates", correct: 0, choosen: 0 },
          { id: 4, title: "Jeff Bezos", correct: 0, choosen: 0 },
        ],
        correct: 1,
      },
      {
        id: 2,
        title: "What's the best website for makine quizzes?",
        choices: [
          { id: 1, title: "Quiz", correct: 1, choosen: 0 },
          { id: 2, title: "Google Forms", correct: 0, choosen: 0 },
        ],
        correct: 1,
      },
    ],
    taken: 0,
    score: 0,
  });
  const Q = {
    AllQuizzes: Quizzes,
  };
  localStorage.setItem("Quizzes", JSON.stringify(Q));
}

function gotoHome(home = 0) {
  window.location.href = home ? "./index.html" : "./../../index.html";
}

function Logout(home = 0) {
  localStorage.removeItem("Login");
  gotoHome(home);
}

function gotoLogin(home = 0) {
  window.location.href = home
    ? "./pages/login/login.html"
    : "./../login/login.html";
}

function gotoSignup(home = 0) {
  window.location.href = home
    ? "./pages/signup/signup.html"
    : "./../signup/signup.html";
}

function gotoProfile(home = 0) {
  window.location.href = home
    ? "./pages/profile/profile.html"
    : "./../profile/profile.html";
}

function gotoAllQuizzes(home = 0) {
  window.location.href = home
    ? "./pages/AllQuizzes/AllQuizzes.html"
    : "./../AllQuizzes/AllQuizzes.html";
}

function gotoMyQuizzes(home = 0) {
  window.location.href = home
    ? "./pages/MyQuizzes/MyQuizzes.html"
    : "./../MyQuizzes/MyQuizzes.html";
}

function gotoInfo(home = 0) {
  window.location.href = home
    ? "./pages/info/info.html"
    : "./../info/info.html";
}

function gotoAllQuizzesFilterd(value) {
  localStorage.setItem("Sort", value ? "full" : "solved");
  gotoAllQuizzes();
}

function ShowNavBar() {
  document.querySelector("nav").style.display = "flex";
  document.getElementById("toggle").style.display = "none";
  document.getElementById("close-nav").style.display = "block";
  document.getElementById("focus").style.display = "block";
}

function HideNavBar() {
  const nav = document.querySelector("nav");
  nav.classList.add("GoNav");
  setTimeout(() => {
    nav.classList.remove("GoNav");
    document.querySelector("nav").style.display = "none";
    document.getElementById("toggle").style.display = "flex";
    document.getElementById("close-nav").style.display = "none";
    document.getElementById("focus").style.display = "none";
  }, 1000);
}
