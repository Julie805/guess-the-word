//The unordered list where the player’s guessed letters will appear //
const guessedLettersList = document.querySelector(".guessed-letters");

//The button with the text “Guess!” in it
const button = document.querySelector(".guess")

//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter"); 

//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");

//The paragraph where the remaining guesses will display.
const remainingGuessesPar = document.querySelector(".remaining");

//The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector("span");

//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

//starting word to test out the game
const word = "magnolia";
const guessedLetters = [];

//adding placeholders for each letter//
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add an event listener for the Guess button
button.addEventListener("click", function(e) {
    e.preventDefault(); //prevents reloading of the page after form is submitted
    // Empty message paragraph
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = playerInputValidation(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
   letterInput.value = "";  
});

//Create a Function to Check Player’s Input

const playerInputValidation = function (input) {
    const acceptedLetter = /[a-zA-Z]/ //regular expression to ensure the player inputs a letter
    if (input.length === 0) {
        message.innerText = "Please enter a letter, A-Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter just one letter at a time to play!";
    } else if (!input.match(acceptedLetter)) { 
        message.innerText = "Sorry, only letters A-Z are allowed!";
    } else {
        return input;
    }
};

//Create a Function to Capture Input

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//Create a Function to Show the Guessed Letters

const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
    }
};

//Create a Function to Update the Word in Progress

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    didYouWin();
};
    //console.log(revealWord);
const didYouWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add(".win");
        message.innerHTML = "<p class="highlight">You guessed correct the word! Congrats!</p>.";
    }
  
};


