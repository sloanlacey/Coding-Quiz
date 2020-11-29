const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

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