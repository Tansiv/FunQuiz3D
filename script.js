const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  }
];

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;

  answerButtons.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.onclick = () => checkAnswer(index);
  });
}

function checkAnswer(index) {
  const correctAnswerIndex = questions[currentQuestionIndex].correct;

  if (index === correctAnswerIndex) {
    score++;
    scoreDisplay.textContent = score;
    alert("Correct Answer!");
  } else {
    alert("Wrong Answer!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  alert(`Game Over! Your final score is ${score}`);
  // Optionally, reset the game or redirect to the leaderboard page.
}
