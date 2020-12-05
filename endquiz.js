const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
// This parses the string into an array--the code below says we are going to get what is in local storage OR we will get an empty array (this would happen if the high scores were cleared or the game is being played for the first time)
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
// This displays the most recent score on the end page--i.e. the one the user just got
finalScore.innerText = mostRecentScore;
// This is the event listener for the username input. The save button is disabled until the user inputs text.
username.addEventListener("keyup", () => {
saveScoreBtn.disabled = !username.value;
});
// prevent default stops the page from posting to a different page which is its default
saveHighScore = e => {
e.preventDefault();
// score object below references the most recent score and a username value
const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};
// the push method pushes the high score onto the high score array, then they are sorted by decreasing value, and spliced after 5--this way, the top scores will remain, and will splice after the 5th highest.
highScores.push(score);
// Sort is a built in JS function that allows you to set your own sorting parameters via this syntax
highScores.sort( (a,b) => b.score - a.score)
highScores.splice(5);
// Convert an array to JSON by stringify--this way we can use the array because things in local storage are saved as strings
localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("./index.html");

};