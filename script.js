// Login Form Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const gameScreen = document.getElementById('game-screen');
const quizScreen = document.getElementById('quiz-screen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const feedbackPopup = document.getElementById('feedback-popup');
const userWelcome = document.getElementById('user-welcome');

// Game Variables
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timerInterval;

// Sample Questions (To be fetched dynamically from the backend later)
const questions = [
  { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
  { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
  { question: "Which planet is closest to the sun?", answers: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
  // More questions can be added
];

// Login / Signup Logic
document.getElementById('login-btn').addEventListener('click', function() {
  // Validate user credentials (use API call here)
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Simulate successful login (you should replace this with actual authentication)
  if (username === 'user' && password === 'password') {
    localStorage.setItem('username', username); // Store username in local storage
    userWelcome.textContent = username; // Display username
    loginForm.style.display = 'none';
    gameScreen.style.display = 'block';
  } else {
    alert('Invalid credentials!');
  }
});

document.getElementById('signup-btn').addEventListener('click', function() {
  // Show signup form and hide login form
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', function() {
  // Go back to login form
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

document.getElementById('signup-submit').addEventListener('click', function() {
  // Register user (in real application, use API)
  alert('User signed up successfully!');
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Game Logic
function startGame() {
  // Initialize quiz
  score = 0;
  currentQuestionIndex = 0;
  scoreDisplay.textContent = score;
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.onclick = () => checkAnswer(index);
  });
}

function checkAnswer(index) {
  const question = questions[currentQuestionIndex];
  if (index === question.correct) {
    score++;
    scoreDisplay.textContent = score;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function startTimer() {
  timeRemaining = 30;
  timerDisplay.textContent = timeRemaining;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      checkAnswer(-1); // Automatically mark wrong if time runs out
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  feedbackPopup.style.display = 'block';
}

// Event listener for next question
nextBtn.addEventListener('click', function() {
  loadQuestion();
});

startBtn.addEventListener('click', startGame);

// Close feedback popup
document.getElementById('close-feedback').addEventListener('click', function() {
  feedbackPopup.style.display = 'none';
  gameScreen.style.display = 'block';
});

// On page load, check if user is already logged in
window.onload = function() {
  const storedUsername = localStorage.getItem('username');      
    if (storedUsername) {
        userWelcome.textContent = storedUsername; // Display username
        loginForm.style.display = 'none';
        gameScreen.style.display = 'block';
    }
}

    