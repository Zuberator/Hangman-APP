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
const attempts = document.getElementById("attempts");

// VARIABLES
let times = 0;
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
  "Ź"
];

// EKRAN POWITALNY

buttonstart.addEventListener("click", () => {
  landing.classList.add("hide");
  setInterval(function () { landing.style.display = "none"; }, 2000);
});

// WPROWADZANIE SŁOWA I ROZPOCZĘCIE GRY

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    landingTypeWord.classList.add("hide");
    setInterval(function () { landing.style.display = "none"; }, 2000);
    start();
  };
});

// FUNKCJA GŁÓWNA

function start() {
  hideWord();
  generateKeyboard();
  addListenersForKeys();
  updateHiddenWord();
}

// UKRYCIE SŁOWA

function hideWord() {
  word = input.value.toUpperCase().split("");
  for (i = 0; i < word.length; i++) {
    if (word[i] == " ") hidden.push(" ");
    else hidden.push("-");
  }
}

// WYGENEROWANIE KLAWIATURY

function generateKeyboard() {
  keyboard.replaceChildren(); //Removing keyboard, if already exist
  hangman.style.display = "flex";
  keyboard.removeAttribute('style');
  for (i = 0; i < alphabet.length; i++) {
    let sign = document.createElement("div");
    sign.classList.add("key");
    sign.setAttribute("id", i);
    sign.textContent = alphabet[i];
    keyboard.appendChild(sign);
  }
}

// DODAJ LISTENER DLA WSZYSTKICH KLAWISZY

function addListenersForKeys() {
  keys = document.querySelectorAll(".key");
  keys.forEach((key) => key.addEventListener("click", checkCompatibility));
}

// SPRAWDŹ, CZY LITERKA JEST W SŁOWIE?

function checkCompatibility(event) {
  for (i = 0; i < word.length; i++) {
    if (word[i] == event.target.textContent) {
      event.target.classList.add("found");
      hidden[i] = word[i];
    }
  }
  disableClickedButton(event);
  updateHiddenWord();
  updateAttempts();
  checkIfYouWon(event);
}

// WYŁĄCZ KLIKNIĘTY PRZYCISK

function disableClickedButton(event) {
  event.target.classList.add("disabled");
  event.target.removeEventListener("click", checkCompatibility);
}

// UAKTUALNIJ UKRYTE SŁOWO

function updateHiddenWord() {
  hiddenWord.textContent = hidden.join("");
}

// UAKTUALNIJ LICZBĘ PRÓB

function updateAttempts() {
  times++;
  attempts.textContent = times;
}

// SPRAWDŹ, CZY WYGRAŁEŚ?

function checkIfYouWon(event) {
  if (hidden.join("") == word.join("")) {
    hangman.style.display = "none";
    keyboard.style.display = "none";
    endgame.style.display = "block";
    endgame.textContent = "GRATULACJE, Wygrałeś! Szukane słowo to: ";
  }
}

// RESTART

buttonrestart.addEventListener("click", () => {
  // location.reload();
  window.location = window.location;
});

String.prototype.podmienZnak = function (miejsce, znak) {
  if (miejsce > this.length - 1) return;
  return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
};

napis = "przysłowie";

console.log(napis.podmienZnak(0, "p"));

// DODAĆ DZWIĘK DO GRY
