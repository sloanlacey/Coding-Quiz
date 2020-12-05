// global constants (refers to the questions, choices (as an array), progress bar and question counter, and the score keeper)
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

// variables (current question as an object, acceptingAnswers creates a delay between questions as it switches the next one, score starts at 0, question counter starts at 0, empty array of available questions (which will be a copy of fulkl question set, we will take Q's out as users answer them so there is always a new question to grab from))
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Each question below is an object inside an array with various choice options, it has the answer "key" that corresponds to the correct choice--Note: the index of the answer integer does not start at 0 because it corresponds to the choice1-4 options.
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

// Constants (correct answers worth 10 points, incorrect is -10 points, and max questions refers to how many questions the user gets in the quiz)
const CORRECT_BONUS = 10;
const INCORRECT_BONUS = -10;
const MAX_QUESTIONS = 5;

// Start game function with arrow syntax, places question counter at 0, starting score of 0, and uses the spread operator to access the questions from the array above--spread operator takes that array and spreads out each of the items and put them into a new array which will be available questions--we have to do this because one array will affect the other, thus, we need a full copy--inside of startGame, there is another function (getNewQuestion) called at the end
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

// Inside of this function we start with a questionCounter that starts the game at 1 (or, first question)--if availableQuestions is 0 OR we have reached the maximum number of questions it means we have gone through all of them and the game ends and 'returns' the user to the end of game page
getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./endquiz.html");
    }
// Below is the question counter and the text within the question counter and progress bar
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
// Progress bar is calculated into a percentage below
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
// Math.floor operation allows us to generate a random question by selecting a random number between 0 and 5. We use availableQuestions.length so that as questions get answered, it knows to find a number between 0 and 4, 0 and 3, and so on as questions get answered by the user
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
// reference current question by getting it out of availableQuestion array
    currentQuestion = availableQuestions[questionIndex];
// this sets the inner text in the html to be the current question along with its properties (displays the question)
    question.innerText = currentQuestion.question;
// choices.forEach iterates through each choice and gives a reference to each choice--choice.dataset refereances the HTML for the number assigned to the question choices (choices 1-4)--this displays the answer choices
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
// Once we answer the question we need to splice it from the array--this takes the array and gets rid of the question we just answered so that it isn't an available option for selection in the next round
    availableQuestions.splice(questionIndex, 1);
// Accepting answers is true means that once we have loaded the question, we want the user to be allowed to answer it
    acceptingAnswers = true;
};
// This takes each choice and adds an event listener, then on click it takes the event (e) as an argument. In the 'if' statement, if the page hasn't completely loaded and the user attempts to click an answer, it will ignore the users click. 
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

// Ternary operator (?) tells the code how to function if the condition on line 110 is true, then it is assigned a correct value, and if not it will be assigned the incorrect value
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
// The code above determines whether or not the answer is correct or incorrect (ex: answer choice 4 is correct, user selects 4 then it is true), and the code below tells the application what to do with correct and incorrect answer choices (change score)
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        } 

        else if(classToApply === "incorrect") {
            incrementScore(INCORRECT_BONUS);
        }
// Apply class by using selected choice by the whole container (parent element) and add the class to apply--this will make the class correct or incorrect depending on user choice and display either red or green. We will then use the same process again to remove the class because we only want it applied long enough for the question to be answered--then, the getNewQuestion function is called and there is a 1 second delay to generate
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});
// Below is the timer that starts at 60 seconds and counts down while the user answers questions. If the timer hits 0, the user is sent to the 'game over' page which presents them with an option to try again or to go back to the home page
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
// Increment score function changes the score based on user selections
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();