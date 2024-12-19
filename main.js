'use strict';

// Number to guess
let number = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;

// Display a dynamic message
function guessMessage(message) {
    document.querySelector('.message').textContent = message;
}

// Reset the game to the default state
function reset() {
    number = Math.trunc(Math.random() * 20 + 1);
    // console.log(`Secret Number Updated: ${number}`);
    document.querySelector('.score').textContent = 20;
    document.querySelector('.guess').value = "";
    document.querySelector('.number').textContent = "?";
    document.querySelector('body').style.backgroundColor = "#222";
    guessMessage(`Start guessing...`);
}

// Check button event listener
document.querySelector("#check").addEventListener("click", () => {
    const guessNumber = Number(document.querySelector('.guess').value)
    let score = Number(document.querySelector('.score').textContent);

    if (score <= 0) {
        // Game reset after exhausting attempts
        reset();
        alert(`Game has reset as you've exhausted your chances.`);
    } else if (!guessNumber) {
        // Handle empty input
        document.querySelector('.guess').style.borderColor = "red";
        guessMessage(`Guess number is required`);

        // Clear red border when refocused
        document.querySelector('.guess').addEventListener("focus", () => {
            document.querySelector('.guess').style.borderColor = "";
            guessMessage(`Start guessing...`);
        });
    } else if (guessNumber < 0) {
        // Handle negative numbers
        document.querySelector('.guess').style.borderColor = "red";
        guessMessage(`Guess number should be positive`);

        document.querySelector('.guess').addEventListener("focus", () => {
            document.querySelector('.guess').style.borderColor = "";
            guessMessage(`Start guessing...`);
        });
    } else if (number === guessNumber) {
        // Correct guess
        document.querySelector(".number").textContent = number;
        document.querySelector("body").style.backgroundColor = "#118B50";
        guessMessage(`🎉 Your guess of ${guessNumber} is correct!`);

        // Update high score
        highScore = score > highScore ? score : highScore;
        document.querySelector(".highscore").textContent = highScore;

        // I want to reset game after win
        // reset();

    } else {
        // Wrong guess
        score--;
        guessMessage(`🤪 Your guess of ${guessNumber} is wrong. ${score} chances left!`);
        document.querySelector('.score').textContent = score;
    }

    document.querySelector('.guess').value = "";
});

// Reset action event listener
document.querySelector('.again').addEventListener("click", () => {
    reset();
});

// console.log(`Secret Number Initialized: ${number}`);
