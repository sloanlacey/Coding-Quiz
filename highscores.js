const highScoresList = document.getElementById("highScoresList");
// Same syntax as end page JS
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Map method to add <li>'s to a list instead of leaving them as strings--writing HTML inside the JS
highScoresList.innerHTML = highScores
    .map( score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
    .join("");
// .join will join all the elements in the array with an empty string--generates a string with all the <li> content