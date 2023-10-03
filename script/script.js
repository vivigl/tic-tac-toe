//Set variables ------------------------------------------------
var box1 = document.getElementById("1");
var box2 = document.getElementById("2");
var box3 = document.getElementById("3");
var box4 = document.getElementById("4");
var box5 = document.getElementById("5");
var box6 = document.getElementById("6");
var box7 = document.getElementById("7");
var box8 = document.getElementById("8");
var box9 = document.getElementById("9");


var stats = document.getElementById("status");

stats.innerText = "Click play to start the game!";

var x = "<img src=\"source/x.png\">";
var o = "<img src=\"source/o.png\">";

var P1 = "Player 1";
var P2 = "Player 2";

restart.addEventListener("click", clear);

//Adding Eventlistener ---------------------------------------------
function TicTacToe() {
  document.getElementById("playersturn").innerText = "Player turn:";
  document.getElementById("player").innerText = P1;
  box1.addEventListener("click", clickBox);
  box2.addEventListener("click", clickBox);
  box3.addEventListener("click", clickBox);
  box4.addEventListener("click", clickBox);
  box5.addEventListener("click", clickBox);
  box6.addEventListener("click", clickBox);
  box7.addEventListener("click", clickBox);
  box8.addEventListener("click", clickBox);
  box9.addEventListener("click", clickBox);
}

//Remove Eventlistener if box contains something
const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

function removeClickEvent(box) {
  if (box.innerHTML !== "") {
    box.removeEventListener("click", clickBox);
  }
}

boxes.forEach(removeClickEvent);

var playerTurn = true;

//Function to click on box -----------------------------------------------
function clickBox(e) {
  const currentPlayer = playerTurn ? P2 : P1;
  const symbol = playerTurn ? x : o;

  document.getElementById("player").innerHTML = currentPlayer;
  e.target.innerHTML = symbol;
  playerTurn = !playerTurn;

  [box1, box2, box3, box4, box5, box6, box7, box8, box9].forEach(box => {
    if (box.innerHTML !== "") {
      box.removeEventListener("click", clickBox);
    }
  });

  const winner = checkWin();
  if (winner !== null) {
    document.getElementById("winningMessage").innerText = `Player ${winner} won! Please restart the game!`;
  }

  if (
    [box1, box2, box3, box4, box5, box6, box7, box8, box9].every(box => box.innerHTML !== "") &&
    checkWin() === null
  ) {
    document.getElementById("nowinning").innerText = "No Winner";
  }
}

//Checking for a win ----------------------------------------------------
function checkWin() {
  const winningConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7] // Diagonals
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    const cellA = document.getElementById(a.toString()).innerHTML;
    const cellB = document.getElementById(b.toString()).innerHTML;
    const cellC = document.getElementById(c.toString()).innerHTML;

    if (cellA !== "" && cellA === cellB && cellA === cellC) {
      return cellA === x ? "1" : "2";
    }
  }
  return null;
}

//Function to reset everything ------------------------------------
function clear() {
  TicTacToe();

  const clearBoxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  clearBoxes.forEach(box => {
    box.innerHTML = "";
  });

  document.getElementById("nowinning").innerText = "";
  document.getElementById("winningMessage").innerText = "";
  document.getElementById("player").innerHTML = P1;

  playerTurn = true;
}
