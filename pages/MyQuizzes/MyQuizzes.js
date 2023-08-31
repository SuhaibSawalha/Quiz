let Username = "";
if (localStorage.getItem("Login")) {
  Username = localStorage.getItem("Login");
  document.getElementById("registration").innerHTML = `
    <button class="btn btn-danger" style="margin-left: 80px" onclick="Logout(0)">Logout</button>
  `;
} else {
  gotoLogin();
}

user = JSON.parse(localStorage.getItem(`${Username}Data`));

function displayQuizzes() {
  document.getElementById("allQuizzes").innerHTML = `
  ${user.Quizzes.map((quiz, index) =>
    quiz.author == Username
      ? `
          <div style="width: 25%; text-align: center; margin-bottom: 20px; position: relative">
              <button style="border: none; background: none;" onclick="DoQuiz(${index})">
                  <lord-icon
                  src="https://cdn.lordicon.com/pqxdilfs.json"
                  trigger="hover"
                  colors="outline:#131432,primary:#a43e97,secondary:#a43e97,tertiary:#ebe6ef"
                  style="width:100px;height:100px">
                  </lord-icon>
                  <div style="max-width: 100px; max-height: 75px; overflow-wrap: anywhere; overflow-y: hidden">
                      <p style="margin-bottom: 0; color: #a43e97">${quiz.title}</p>
                  </div>
              </button>
              <lord-icon
              src="https://cdn.lordicon.com/ricosjfq.json"
              trigger="hover"
              colors="outline:#121331,primary:#000000,secondary:#e83a30"
              style="width:30px;height:30px; position: absolute; left: calc(50% + 20px);"
              onclick="DeleteDone(${index})"
              >
          </lord-icon>
          </div>
      `
      : ""
  ).join("")}
  <div style="width: 25%; text-align: center; margin-bottom: 20px">
  <button style="border: none; background: none" onclick="MakeQuiz()">
  <lord-icon
      src="https://cdn.lordicon.com/mecwbjnp.json"
      trigger="loop"
      delay="500"
      colors="primary:#121331,secondary:#08a88a"
      style="width:100px;height:100px">
  </lord-icon>
      <div style="max-width: 100px; max-height: 75px; overflow-wrap: anywhere; overflow-y: hidden">
          <p style="margin-bottom: 0; color: #3BA249">Make Quiz</p>
      </div>
  </button>
</div>
  `;
}
displayQuizzes();

let Questions = [];

function MakeQuiz() {
  document.getElementById("focus").style.display = "block";
  document.getElementById("MakeQuiz").style.display = "block";
  document.getElementById("title").innerHTML = `Quiz Title`;
  AddQuestion();
}

function reloadQuestions() {
  document.getElementById("Questions").innerHTML = Questions.map(
    (question) =>
      `
    <div class="d-flex ms-3 pe-3 justify-content-between" style="width: 100%">
        <div class="d-flex align-items-start">
            <p> ${question.id}. </p>
            <div class="QtitleBox">
                <p contenteditable class="Qtitle" id="Questiontitle-${
                  question.id
                }" onkeyup="changeTitle(${question.id})">${question.title}</p>
            </div>
        </div>
        ${
          Questions.length > 1
            ? `<button class="deleteQuestion" onclick="DeleteQuestion(${question.id})"> x </button>`
            : ""
        }
    </div>
    <form class="questionForm" id="form-${
      question.id
    }" onchange="changeCorrectChoice(${question.id})">
    </form>
    <button class="btn btn-secondary addChoice" onclick="AddChoice(${
      question.id
    })">+ add choice</button>
    <div class="line"></div>
    `
  ).join("");
  Questions.forEach((question) => reloadChoices(question));
}

function reloadChoices(question) {
  document.getElementById(`form-${question.id}`).innerHTML = question.choices
    .map(
      (choice) =>
        `
    <div class="d-flex">
        <input type="Radio" name="choice-for-question-${
          question.id
        }" id="QuestionID-${question.id}-choice-${choice.id}" ${
          choice.correct ? "checked" : ""
        }/>
        <div class="CtitleBox">
        <label contenteditable class="Ctitle" onkeyup="changeChoiceTitle(${
          question.id
        }, ${choice.id})" id="title-${question.id}-choice-${choice.id}"> ${
          choice.title
        } </label>
        </div>
        ${
          question.choices.length > 1
            ? `<button class="deleteChoice" type="button" onclick="DeleteChoice(${question.id}, ${choice.id})">x</button>`
            : ""
        }
    </div>
    `
    )
    .join("");
}

function AddQuestion() {
  let question = {
    id: Questions.length + 1,
    title: "The Question",
    choices: [{ id: 1, title: "Choice", correct: 1, choosen: 0 }],
    correct: 1,
  };
  Questions.push(question);
  reloadQuestions();
}

function AddChoice(id) {
  Questions[id - 1].choices.push({
    id: Questions[id - 1].choices.length + 1,
    title: "Choice",
    correct: 0,
    choosen: 0,
  });
  reloadChoices(Questions[id - 1], id);
}

function changeCorrectChoice(id) {
  Questions[id - 1].choices.forEach((choice) => {
    if (
      document.getElementById(`QuestionID-${id}-choice-${choice.id}`).checked
    ) {
      Questions[id - 1].correct = choice.id;
    }
  });
  Questions[id - 1].choices.forEach((choice) => {
    choice.correct = Questions[id - 1].correct == choice.id;
  });
}

function changeTitle(id) {
  Questions[id - 1].title = document.getElementById(
    `Questiontitle-${id}`
  ).innerHTML;
}

function changeChoiceTitle(id, cID) {
  Questions[id - 1].choices[cID - 1].title = document.getElementById(
    `title-${id}-choice-${cID}`
  ).innerHTML;
}

function DeleteQuestion(id) {
  Questions.splice(id - 1, 1);
  Questions.map((question, index) => (question.id = index + 1));
  reloadQuestions();
}

function DeleteChoice(id, cID) {
  if (Questions[id - 1].choices[cID - 1].correct) {
    Questions[id - 1].choices[0].correct = 1;
  }
  Questions[id - 1].choices.splice(cID - 1, 1);
  Questions[id - 1].choices.map((choice, index) => (choice.id = index + 1));
  reloadChoices(Questions[id - 1], id);
}

function Finished() {
  document.getElementById("MakeQuiz").style.display = "none";
  document.getElementById("focus").style.display = "none";
  Quizzes = JSON.parse(localStorage.getItem("Quizzes"));
  const NQ = Number(localStorage.getItem("QuizID"));
  const quiz = {
    id: NQ,
    author: Username,
    title: document.getElementById("title").innerHTML,
    questions: Questions,
    taken: 0,
    score: 0,
  };
  localStorage.setItem("QuizID", NQ + 1);
  Quizzes.AllQuizzes.push(quiz);
  user.Quizzes.push(quiz);
  Questions = [];
  localStorage.setItem("Quizzes", JSON.stringify(Quizzes));
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
  displayQuizzes();
}

function Delete() {
  document.getElementById("shadowDelete").style.display = "block";
  document.getElementById("confirmDelete").style.display = "block";
}

function DeleteQuiz() {
  document.getElementById("shadowDelete").style.display = "none";
  document.getElementById("confirmDelete").style.display = "none";
  document.getElementById("MakeQuiz").style.display = "none";
  document.getElementById("focus").style.display = "none";
  Questions = [];
}

function NotDeletingQuiz() {
  document.getElementById("shadowDelete").style.display = "none";
  document.getElementById("confirmDelete").style.display = "none";
}

function DoQuiz(index) {
  quiz = user.Quizzes[index];
  document.getElementById("DoQuiz").style.display = "block";
  document.getElementById("focus").style.display = "block";
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
            <p style="color: red; margin-left: 10px; font-size: 0.8rem" id="Quiz-${index}-required-${
              question.id
            }"></p>
        </div>
          <form class="questionForm" id="form-${question.id}">
          ${question.choices
            .map(
              (choice) =>
                `
              <div class="d-flex">
                <input disabled style="margin-top: 10px;" ${
                  choice.correct ? `checked class="correctChoice"` : ""
                } type="Radio"/>
                <div class="QtitleBox" style="overflow-wrap: anywhere; border: none; margin-bottom: 0;">
                <label style="margin-top: 10px; margin-left: 10px;" class="Ctitle" id="title-${
                  question.id
                }-choice-${choice.id}"> ${choice.title} </label>
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
          <button class="btn btn-danger" onclick="QuizDone()">Close</button>
      `;
}

function QuizDone() {
  document.getElementById("DoQuiz").style.display = "none";
  document.getElementById("focus").style.display = "none";
  displayQuizzes();
}

let DeleteIndex;
function DeleteDone(index) {
  DeleteIndex = index;
  document.getElementById("shadowDelete").style.display = "block";
  document.getElementById("confirmDeleteDone").style.display = "block";
}

function NotDeletingDoneQuiz() {
  document.getElementById("shadowDelete").style.display = "none";
  document.getElementById("confirmDeleteDone").style.display = "none";
}

function DeleteDoneQuiz() {
  const id = user.Quizzes[DeleteIndex].id;
  user.Quizzes.splice(DeleteIndex, 1);
  localStorage.setItem(`${Username}Data`, JSON.stringify(user));
  Quizzes = JSON.parse(localStorage.getItem("Quizzes"));
  for (let i = 0; i < Quizzes.AllQuizzes.length; ++i) {
    if (Quizzes.AllQuizzes[i].id == id) {
      console.log(Quizzes.AllQuizzes);
      Quizzes.AllQuizzes.splice(i, 1);
      console.log(Quizzes.AllQuizzes);
      break;
    }
  }
  localStorage.setItem("Quizzes", JSON.stringify(Quizzes));
  displayQuizzes();
  document.getElementById("shadowDelete").style.display = "none";
  document.getElementById("confirmDeleteDone").style.display = "none";
}
