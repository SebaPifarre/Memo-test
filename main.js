const fruits = [
  "aji",
  "anana",
  "banana",
  "cerezas",
  "coco",
  "frutillas",
  "kiwi",
  "limon",
];

let $firstSquare = null;
let matchedPairs = 0;
const TOTAL_PAIRS = fruits.length;

function setBoard() {
  const doubledFruits = fruits.concat(fruits);
  const randomFruits = shuffle(doubledFruits);

  const $cols = document.querySelectorAll("#col");

  $cols.forEach((col, index) => {
    const $div = document.createElement("div");
    $div.classList.add("square");
    $div.id = randomFruits[index];

    const $img = document.createElement("img");
    $img.src = `./assets/images/${randomFruits[index]}.png`;
    $img.alt = `${randomFruits[index]}`;

    $div.appendChild($img);

    col.appendChild($div);
  });
}

const $gameBoard = document.querySelector(".game-board");
$gameBoard.onclick = (event) => {
  const $element = event.target.closest(".square");
  if ($element) {
    handleClickOnSquare($element);
  }
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function handleClickOnSquare($currentSquare) {
  showSquare($currentSquare);

  if (!$firstSquare) {
    $firstSquare = $currentSquare;
  } else {
    if ($firstSquare === $currentSquare) {
      return;
    }

    if (matchedSquares($firstSquare, $currentSquare)) {
      blockSquare($firstSquare);
      blockSquare($currentSquare);
      matchedPairs++;
      if (matchedPairs === TOTAL_PAIRS) {
        showResults();
      }
    } else {
      hideSquare($firstSquare);
      hideSquare($currentSquare);
    }

    $firstSquare = null;
  }
}

function showSquare($square) {
  $square.classList.add("flipped");
}

function hideSquare($square) {
  setTimeout(() => {
    $square.classList.remove("flipped");
  }, 500);
}

function blockSquare($square) {
  $square.classList.add("matched");
}

function matchedSquares(first, second) {
  return first.id === second.id;
}

function showResults() {
  const results = [];

  const $alert = document.createElement("div");
  $alert.className = "alert alert-success";
  $alert.role = "alert";
  $alert.textContent = "You won!";
  results.push($alert);

  const $button = document.createElement("button");
  $button.type = "button";
  $button.textContent = "Play again?";
  $button.onclick = reset;
  results.push($button);

  const $results = document.querySelectorAll("#results");
  $results.forEach((node, index) => {
    node.appendChild(results[index]);
  });
}

function hideResults() {
  const $results = document.querySelectorAll("#results");
  $results.forEach((node) => {
    node.innerHTML = "";
  });
}

function reset() {
  $firstSquare = null;
  matchedPairs = 0;
  deleteBoard();
  setBoard();
  hideResults();
}

function deleteBoard() {
  const $cols = document.querySelectorAll("#col");
  $cols.forEach((col) => {
    col.innerHTML = "";
  });
}

setBoard();
