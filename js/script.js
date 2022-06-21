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
let word = "magnolia";
let guessedLetters = [];
// Declare a Global Variable for the Number of Guesses
let remainingGuesses = 8;

//Add an async function
const getWord = async function() {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
   // console.log(words);
   const wordArray = words.split("\n");
   //console.log(getWord);
   const randomIndex = Math.floor(Math.random() * wordArray.length);
   word = wordArray[randomIndex].trim();
   placeholder(word);
};
//Start the game
getWord();
//adding placeholders for each letter//
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


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
        countRemainingGuesses(guess);
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

// Create a Function to Count Guesses Remaining

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    
    if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the letter ${guess} is
    not in the word.`;
    remainingGuesses -= 1;        
    } else {                   
    message.innerText = `Good guess! The letter ${guess} is in the word.`; 
    }

    if (remainingGuesses === 0) {             message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else { 
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;    
    }
};

const didYouWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add(".win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>.`;

        startOver();
    } 
};

//Create a Function to Hide and Show Elements
const startOver = function () {
    button.classList.add("hide");
    remainingGuessesPar.classList.add("hide");
    guessedLettersList.classList.add("hide");playAgainButton.classList.remove("hide");
};

//Add a Click Event to the Play Again Button

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; 

    button.classList.remove("hide");
    remainingGuessesPar.classList.remove("hide");
    guessedLettersList.classList.remove("hide");playAgainButton.classList.add("hide");
    getWord();
});










