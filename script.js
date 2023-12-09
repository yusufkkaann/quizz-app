const questions = [
  {
    question: "Türkiyenin başkendi neresidir?",
    answers: [
      { text: "Adana", correct: false },
      { text: "Ankara", correct: true },
      { text: "İstanbul", correct: false },
      { text: "Diyarbakır", correct: false },
    ],
  },
  {
    question: "Dünyaya en yakın gezegen hangisidir?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Merkür", correct: false },
      { text: "Venüs", correct: true },
      { text: "Güneş", correct: false },
    ],
  },
  {
    question: "En uzun gece hangi gündür?",
    answers: [
      { text: "1 Ocak", correct: false },
      { text: "21 Aralık", correct: true },
      { text: "6 Eylül", correct: false },
      { text: "20 Kasım", correct: false },
    ],
  },
  {
    question: "Aya giden ilk insan kimdir?",
    answers: [
      { text: "Elon Musk", correct: false },
      { text: "Stephan Hawking", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Einstein", correct: false },
    ],
  },
];
const question = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Sonraki Soru";
  showQuestion();
}
function showQuestion() {
  resetAnswers();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetAnswers() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetAnswers();
  question.innerHTML = `Tebrikler ${questions.length} sorudan ${score} tanesini doğru bildiniz!`;
  nextBtn.innerHTML = "Tekrar Başla";
  nextBtn.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
