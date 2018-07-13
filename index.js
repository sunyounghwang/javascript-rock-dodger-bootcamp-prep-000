const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge >= dodgerLeftEdge && rockLeftEdge <= dodgerRightEdge ||
      rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
        return true
      }
    }
  }

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

   GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`

    if (checkCollision(rock)) {
        endGame();
    } else if (rock.style.top < GAME_HEIGHT) {
        moveRock();
    } else {
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);

  for (let i = 0, l = ROCKS.length; i < l; i ++) {
    ROCKS[i].remove();
  }

  window.removeEventListener('keydown', moveDodger);

  alert('YOU LOSE!');
}

// implement me!
/**
 * This function should call `moveDodgerLeft()`
 * if the left arrow is pressed and `moveDodgerRight()`
 * if the right arrow is pressed. (Check the constants
 * we've declared for you above.)
 * And be sure to use the functions declared below!
 */
function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }

  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

// implement me!
/**
 * This function should move DODGER to the left
 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
 */
function moveDodgerLeft() {
  /*var left = dodger.style.left;
  var leftNumber = positionToInteger(left);

  if (left > 0) {
    left = `${leftNumber - 4}px`;
  }
}*/
var leftNumbers = dodger.style.left.replace('px', '')
var left = parseInt(leftNumbers, 10)

function step(){
  if (left > 0) {
    dodger.style.left = `${left - 4}px`
  }
}
window.requestAnimationFrame(step);
}

// implement me!
/**
 * This function should move DODGER to the right
 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
 */
function moveDodgerRight() {
  var left = dodger.style.left;
  var leftNumber = positionToInteger(left);

  function step() {
    if (leftNumber < 360) {
    dodger.style.left = `${leftNumber + 4}px`;
  }
}

window.requestAnimationFrame(step);
}


/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
