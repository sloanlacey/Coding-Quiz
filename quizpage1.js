const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "A short section of code written to complete a task is called a:",
        choice1: "Buffer",
        choice2: "Array",
        choice3: "Function",
        choice4: "Method",
        answer: 3
    },
    {
        question: "What does a != t mean?",
        choice1: "a is assigned to t",
        choice2: "a and t are equal",
        choice3: "add t to a",
        choice4: "a does not equal t",
        answer: 4  
    },
    {
        question: "Finding and fixing problems in code is known as...",
        choice1: "Decoding",
        choice2: "Debugging",
        choice3: "Programming",
        choice4: "Coding",
        answer: 2
    },
    {
        question: "In HTML, where do you place the <script> tag?",
        choice1: "Inside the body tag",
        choice2: "Inside the head tag",
        choice3: "As a global selector",
        choice4: "Anywhere you want",
        answer: 1
    },
    {
        question: "What does the # symbol reference in CSS? The .?",
        choice1: "color, font style",
        choice2: "id, class",
        choice3: "class, id",
        choice4: "text size, font style",
        answer: 2
    },
];

// Constants

const CORRECT_BONUS = 10;
const INCORRECT_BONUS = -10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./endquiz.html");
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        } 

        else if(classToApply === "incorrect") {
            incrementScore(INCORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

var secondsLeft = 60;

function setTime() {
    var timerEl = document.querySelector(".timer");
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = "Timer: " + secondsLeft;
  
      if (secondsLeft === 0) {
        return window.location.assign("./gameover.html")
      }
  
    }, 1000);
  }

  setTime();

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();