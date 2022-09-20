// BUTTONS
const buttonstart = document.getElementById("buttonstart");
const buttonrestart = document.getElementById("buttonrestart");

// LANDING
const landing = document.getElementById("landing");
const landingTypeWord = document.getElementById("landing-typeword");

// ELEMENTS
const input = document.getElementById("userword");
const hiddenWord = document.getElementById("hiddenword");
const hangman = document.getElementById("hangman");
const keyboard = document.getElementById("keyboard");
const allGuessesBox = document.getElementById("allGuessesBox");
const badGuessesBox = document.getElementById("badGuessesBox");

// VARIABLES
let allGuesses = 0;
let badGuesses = 0;
let word = [];
let hidden = [];
let keys = [];
var alphabet = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "W",
  "V",
  "X",
  "Y",
  "Z",
  "Ż",
  "Ź",
];

// WELCOME PAGE

buttonstart.addEventListener("click", () => {
  landing.classList.add("hide");
  setInterval(function () {
    landing.style.display = "none";
  }, 2000);
});

// INPUT WORD AND WAIT FOR ENTER

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    landingTypeWord.classList.add("hide");
    setInterval(function () {
      landing.style.display = "none";
    }, 2000);
    start();
  }
});

// MAIN GAME FUNCTION

function start() {
  hideWord();
  generateKeyboard();
  addListenersForKeys();
  updateHiddenWord();
}

// HIDE WORD

function hideWord() {
  word = input.value.toUpperCase().split("");
  for (i = 0; i < word.length; i++) {
    if (word[i] == " ") hidden.push(" ");
    else hidden.push("-");
  }
}

// GENERATE KEYBOARD

function generateKeyboard() {
  keyboard.replaceChildren(); //Removing keyboard, if already exist
  hangman.removeAttribute("style");
  keyboard.removeAttribute("style");
  for (i = 0; i < alphabet.length; i++) {
    let keyButton = document.createElement("button");
    keyButton.classList.add("key");
    keyButton.setAttribute("id", i);
    keyButton.textContent = alphabet[i];
    keyboard.appendChild(keyButton);
  }
}

// ADD LISTENER FOR ALL KEYBOARD KEYS

// function addListenersForKeys() {
//   keys = document.querySelectorAll(".key");
//   keys.forEach((key) =>
//     key.addEventListener("click", (event) => {
//       checkCompatibility(event);
//       disableClickedButton(event);
//       updateHiddenWord();
//       updateAttempts();
//       checkIfYouWonOrLost();
//     })
//   );
// }

function addListenersForKeys() {
  keys = document.querySelectorAll(".key");
  keys.forEach((key) => key.addEventListener("click", checkCompatibility));
}

// CHECK IF THE LITERAL IS IN THE WORD?

function checkCompatibility(event) {
  let guessed = false;

  word.forEach((string, index) => {
    if (string == event.target.textContent) {
      event.target.classList.add("found");
      hidden[index] = string;
      guessed = true;
    }
  });

  if (!guessed) {
    badGuesses++;
    drawHangman();
  }

  disableClickedButton(event);
  updateHiddenWord();
  updateAttempts();
  checkIfYouWonOrLost();

  // for (i = 0; i < word.length; i++) {
  //   if (word[i] == event.target.textContent) {
  //     event.target.classList.add("found");
  //     hidden[i] = word[i];
  //     guessed = true;
  //   }
  // }

  // if (!guessed) {
  //   badGuesses++;
  //   drawHangman();
  // }
}

// DISABLE CLICKED KEYBOARD KEY AND REMOVE LISTENER FOR IT

function disableClickedButton(event) {
  event.target.classList.add("disabled");
  event.target.removeEventListener("click", checkCompatibility);
}

// UPDATE HIDDEN WORD

function updateHiddenWord() {
  hiddenWord.textContent = hidden.join("");
}

// UPDATE ALL GUESSES

function updateAttempts() {
  allGuesses++;
  allGuessesBox.textContent = allGuesses;
  badGuessesBox.textContent = badGuesses;
}

// DRAW HANGMAN

function drawHangman() {
  let hangmanPart = hangman.querySelector(`.part[part="${badGuesses}"]`);
  hangmanPart.style.stroke = "black";
}

// CHECK, IF YOU WON OR LOST?

function checkIfYouWonOrLost() {
  if (hidden.join("") == word.join("") || badGuesses >= 11) {
    hangman.style.display = "none";
    keyboard.style.display = "none";
    hiddenWord.style.display = "none";
    endgame.style.display = "block";
  }

  if (hidden.join("") == word.join(""))
    return (endgame.innerHTML = `CONGRATULATIONS, You won! The word you were looking for was: <p>${word.join(
      ""
    )}</p>`);

  if (badGuesses >= 11)
    return (endgame.innerHTML = `SORRY, You Lost! The word you were looking for was: <p>${word.join(
      ""
    )}</p>`);
}

// RESTART

buttonrestart.addEventListener("click", () => {
  window.location = window.location;
});

// |
// |
// |
// INNE - NIEPOTRZEBNE
// |
// |
// |

String.prototype.podmienZnak = function (miejsce, znak) {
  if (miejsce > this.length - 1) return;
  return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
};

napis = "word word";

console.log(napis.podmienZnak(0, "p"));

// DODAĆ DZWIĘK DO GRY
