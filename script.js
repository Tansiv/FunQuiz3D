// Get DOM elements
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-btn');

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timerInterval;

// Sample questions
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

// Sound effects
const correctSound = new Audio('assets/sounds/correct.mp3');
const wrongSound = new Audio('assets/sounds/wrong.mp3');

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Start the quiz
function startGame() {
  startButton.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  loadQuestion();
  startTimer();
}

// Load a new question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;

  answerButtons.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.onclick = () => checkAnswer(index);
  });
}

// Check the user's answer
function checkAnswer(index) {
  const correctAnswerIndex = questions[currentQuestionIndex].correct;

  if (index === correctAnswerIndex) {
    score++;
    scoreDisplay.textContent = score;
    correctSound.play();
    alert("Correct Answer!");
  } else {
    wrongSound.play();
    alert("Wrong Answer!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

// End the game
function endGame() {
  alert(`Game Over! Your final score is ${score}`);
  restartButton.classList.remove('hidden');
  clearInterval(timerInterval);
}

// Restart the game
function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  scoreDisplay.textContent = score;
  restartButton.classList.add('hidden');
  loadQuestion();
  timeRemaining = 30;
  timerDisplay.textContent = timeRemaining;
  startTimer();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      checkAnswer(-1);  // Mark as wrong answer if time runs out
    }
  }, 1000);
}
