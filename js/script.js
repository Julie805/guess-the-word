const guessedLettersList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess")
const letterInput = document.querySelector(".letter"); 
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesPar = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//Start the game
getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


button.addEventListener("click", function(e) {
    e.preventDefault(); 
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = playerInputValidation(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
   letterInput.value = "";  
});

const playerInputValidation = function (input) {
    const acceptedLetter = /[a-zA-Z]/ 
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

const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
    }
};

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

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the letter ${guess} is not in the word.`;
        remainingGuesses -= 1;        
    } else {                   
        message.innerText = `Good guess! The letter ${guess} is in the word.`; 
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else { 
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;    
    }
};

const didYouWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    } 
};

const startOver = function () {
    button.classList.add("hide");
    remainingGuessesPar.classList.add("hide");
    guessedLettersList.classList.add("hide");playAgainButton.classList.remove("hide");
};

//reset all values and get new word
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; 
    getWord();

    button.classList.remove("hide");
    remainingGuessesPar.classList.remove("hide");
    guessedLettersList.classList.remove("hide");playAgainButton.classList.add("hide");   
});










