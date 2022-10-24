const board = document.querySelector("[data-board]");
const cells = document.querySelectorAll("[data-cell]");
const endGameBox = document.querySelector("[end-game-box]");
const endGameText = document.querySelector("[end-game-text]");
const buttonRestart = document.getElementById("buttonRestart");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let currentTurn = "cross";

setPlayerTurnSign(currentTurn);

cells.forEach((element) => {
  element.addEventListener("click", clickAction, { once: true });
});

function clickAction(event) {
  event.target.classList.add(currentTurn);
  if (checkWin(currentTurn)) endGame();
  if (isDraw()) endGame(draw);
  else {
    currentTurn = currentTurn === "cross" ? "circle" : "cross";
    setPlayerTurnSign(currentTurn);
  }
}

function checkWin(currentTurn) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentTurn);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains("cross") || cell.classList.contains("circle")
    );
  });
}

function endGame(draw) {
  if (draw) {
    endGameText.innerText = "Draw!";
  } else {
    endGameText.innerText = `${currentTurn} Wins!`;
  }
  board.style.display = "none";
  endGameBox.style.display = "flex";
}

function setPlayerTurnSign(currentTurn) {
  board.removeAttribute("class");
  board.classList.add(currentTurn);
}

// RESTART

buttonRestart.addEventListener("click", () => {
  window.location = window.location;
});

// cells.forEach((element) => {
//   element.addEventListener("click", () => {
//     once: true;
//   });
//   element.addEventListener("mouseover", () => {
//     board.classList.add("circle");
//   });
//   element.addEventListener("mouseout", () => {
//     board.classList.remove("circle");
//   });
// });
