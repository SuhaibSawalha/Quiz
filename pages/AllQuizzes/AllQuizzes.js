let Username = "";
if (localStorage.getItem("Login")) {
  Username = localStorage.getItem("Login");
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-danger" style="margin-left: 80px" onclick="Logout(0)">Logout</button>
  `;
  Quizzes = JSON.parse(localStorage.getItem("Quizzes")).AllQuizzes;
  user = JSON.parse(localStorage.getItem(`${Username}Data`));
  for (let i = 0; i < Quizzes.length; ++i) {
    let found = 0;
    for (let j = 0; j < user.Quizzes.length; ++j) {
      if (Quizzes[i].id == user.Quizzes[j].id) {
        found = 1;
      }
    }
    if (!found) {
      user.Quizzes.push(Quizzes[i]);
    }
  }
  for (let i = 0; i < user.Quizzes.length; ++i) {
    let found = 0;
    for (let j = 0; j < Quizzes.length; ++j) {
      if (Quizzes[j].id == user.Quizzes[i].id) {
        found = 1;
      }
    }
    if (found == 0) {
      user.Quizzes.splice(i, 1);
      --i;
    }
  }
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
} else {
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-secondary" onclick="gotoSignup(0)">
        Sign up
    </button>
    <button class="btn btn-primary" onclick="gotoLogin(0)">Login</button>
  `;
}

function displayQuizzes() {
  let Q =
    Username == ""
      ? JSON.parse(localStorage.getItem("Quizzes")).AllQuizzes
      : user.Quizzes;
  const value = localStorage.getItem("Sort");
  document.querySelector("select").value = value;
  if (value == "solved") {
    Q = Q.filter((quiz) => quiz.taken);
  }
  if (value == "unsolved") {
    Q = Q.filter((quiz) => !quiz.taken);
  }
  if (value == "full") {
    Q = Q.filter((quiz) => quiz.taken && quiz.score == quiz.questions.length);
  }
  document.getElementById("allQuizzes").innerHTML = Q.map(
    (quiz) => `
        <div style="width: 25%; text-align: center; margin-bottom: 20px; position: relative;">
            <button style="border: none; background: none" onclick="DoQuiz(${
              quiz.id
            })">
            ${
              quiz.taken
                ? `
                <lord-icon
                src="https://cdn.lordicon.com/pqxdilfs.json"
                trigger="hover"
                colors="outline:#131432,primary:#30e849,secondary:#109121,tertiary:#ebe6ef"
                style="width:100px;height:100px">
                </lord-icon>
                `
                : `
                <lord-icon
                src="https://cdn.lordicon.com/pqxdilfs.json"
                trigger="hover"
                colors="outline:#131432,primary:#30c9e8,secondary:#66a1ee,tertiary:#ebe6ef"
                style="width:100px;height:100px">
                </lord-icon>
                `
            }
            ${
              quiz.taken && quiz.score == quiz.questions.length
                ? `<img
                  src="./../../img/full.png"
                  style="width: 70px; height: 50px; position: absolute; left: calc(50% - 50px); top: 55px"
                />`
                : ""
            }
                <div style="max-width: 100px; max-height: 75px; overflow-wrap: anywhere; overflow-y: hidden">
                    <p style="margin-bottom: 0; ${
                      quiz.taken ? "color: #3BA249" : ""
                    }">${quiz.title}</p>
                </div>
            </button>
        </div>
    `
  ).join("");
}
displayQuizzes();

function DoQuiz(id) {
  if (Username == "") {
    alert("Please Login to do the quiz");
    return;
  }
  let quiz;
  for (let i = 0; i < user.Quizzes.length; ++i) {
    if (user.Quizzes[i].id == id) {
      quiz = user.Quizzes[i];
    }
  }
  document.getElementById("DoQuiz").style.display = "block";
  document.getElementById("focus").style.display = "block";
  if (quiz.taken) {
    document.getElementById("DoQuiz").innerHTML = `
        <div class="d-flex text-center align-items-center">
            <p style="margin-bottom: 0; text-align: center; height: 30px;">Score:</p> 
            <div style="background-color: #a43e97; margin-left: 10px; min-width: 50px; height: 40px; text-align: center; border-radius: 10px; poistion: relative;">
                <p style="color: white; margin-bottom: 0; font-size: 1.2rem; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);">${
                  quiz.score
                }/${quiz.questions.length}</p>
            </div>
        </div>
        <div class="line"></div>
        <div style="width: 100%; text-align: center; overflow-wrap: anywhere;">
        <p style="font-size: 2rem">${quiz.title}</p>
    </div>
    <div class="line"></div>
    ${quiz.questions
      .map(
        (question) =>
          `
          <div class="d-flex pe-3" style="width: 100%;">
          <div class="QtitleBox d-flex align-items-start" style="overflow-wrap: anywhere; border: none; margin-bottom: -10px;">
              <p> ${question.id}. </p>
                  <p class="Qtitle ms-3" id="Questiontitle-${question.id}">${
            question.title
          }</p>
          </div>
          <p style="color: red; margin-left: 10px; font-size: 0.8rem" id="Quiz-${
            quiz.id
          }-required-${question.id}"></p>
      </div>
        <form class="questionForm" id="form-${question.id}">
        ${question.choices
          .map(
            (choice) =>
              `
            <div class="d-flex">
              <input disabled style="margin-top: 10px;" ${
                choice.choosen ? `checked class="choicenChoice"` : ""
              } 
              ${
                !choice.choosen && choice.correct
                  ? `checked class="correctChoice"`
                  : ""
              } type="Radio"/>
              <div class="QtitleBox" style="overflow-wrap: anywhere; border: none; margin-bottom: 0;">
              <label style="margin-top: 10px; margin-left: 10px;" class="Ctitle" id="title-${
                question.id
              }-choice-${choice.id}"> ${choice.title} </label>
              </div>
              ${
                choice.choosen
                  ? choice.correct
                    ? `<p style="color: green; margin-left: 10px; margin-bottom: 0px; margin-top: 5px; font-size: 1.3rem">✓</p>`
                    : `<p style="color: red; margin-left: 10px; margin-bottom: 0px; margin-top: 5px; font-size: 1.3rem">x</p>`
                  : ""
              }

            </div>
            `
          )
          .join("")}
        </form>
        <div class="line"></div>
        `
      )
      .join("")}
      <button class="btn btn-danger" onclick="Close()")">Close</button>
    `;
    return;
  }
  document.getElementById("DoQuiz").innerHTML = `
    <div style="width: 100%; text-align: center; overflow-wrap: anywhere;">
        <p style="font-size: 2rem">${quiz.title}</p>
    </div>
    <div class="line"></div>
    ${quiz.questions
      .map(
        (question) =>
          `
        <div class="d-flex pe-3" style="width: 100%;">
            <div class="QtitleBox d-flex align-items-start" style="overflow-wrap: anywhere; border: none; margin-bottom: -10px;">
                <p> ${question.id}. </p>
                    <p class="Qtitle ms-3" id="Questiontitle-${question.id}">${
            question.title
          }</p>
            </div>
            <p style="color: red; margin-left: 10px; font-size: 0.8rem" id="Quiz-${
              quiz.id
            }-required-${question.id}"></p>
        </div>
        <form class="questionForm" id="form-${question.id}">
        ${question.choices
          .map(
            (choice) =>
              `
            <div class="d-flex">
              <input style="margin-top: 10px" type="Radio" name="choice-for-question-${question.id}" id="Quiz-${quiz.id}-QuestionID-${question.id}-choice-${choice.id}"/>
              <div class="QtitleBox" style="overflow-wrap: anywhere; border: none; margin-bottom: 0;">
              <label style="margin-top: 10px; margin-left: 10px; cursor: pointer;" class="Ctitle" id="title-${question.id}-choice-${choice.id}" for="Quiz-${quiz.id}-QuestionID-${question.id}-choice-${choice.id}"> ${choice.title} </label>
              </div>
            </div>
            `
          )
          .join("")}
        </form>
        <div class="line"></div>
        `
      )
      .join("")}
      <button class="btn btn-submit" onclick="Submit(${
        quiz.id
      })">Submit</button>
      <button class="btn btn-danger ms-3" onclick="Close()")">Close</button>
  `;
}

function Submit(id) {
  let currentScore = 0,
    notCompleted = 0;
  let quiz;
  for (let i = 0; i < user.Quizzes.length; ++i) {
    if (user.Quizzes[i].id == id) {
      quiz = user.Quizzes[i];
    }
  }
  quiz.questions.forEach((question) => {
    let checked = -1;
    for (let i = 1; i <= question.choices.length; ++i) {
      if (
        document.getElementById(
          `Quiz-${quiz.id}-QuestionID-${question.id}-choice-${i}`
        ).checked
      ) {
        checked = i;
        question.choices[i - 1].choosen = 1;
      }
    }
    const required = document.getElementById(
      `Quiz-${quiz.id}-required-${question.id}`
    );
    if (checked == -1) {
      required.innerHTML = "* answer the question";
      notCompleted = 1;
    } else {
      currentScore += question.correct == checked;
      required.innerHTML = "";
    }
  });
  if (notCompleted) {
    return;
  }
  quiz.taken = 1;
  quiz.score = currentScore;
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
  DoQuiz(quiz.id);
}

function Close() {
  document.getElementById("DoQuiz").style.display = "none";
  document.getElementById("focus").style.display = "none";
  displayQuizzes();
}

function Sort() {
  localStorage.setItem("Sort", document.querySelector("select").value);
  displayQuizzes();
}
