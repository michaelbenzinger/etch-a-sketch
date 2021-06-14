let gridSize = 16;
let randomizer = 100;
let colorChoice = [80,40,210]
let blankColor = "#263138";

const gameArea = document.querySelector('#game-area');
const sketchGrid = document.createElement('container');
const clearBtn = document.querySelector('#clear-btn');
const sizeDown = document.querySelector('#size-down');
const sizeUp = document.querySelector('#size-up');
const colorBtn = document.querySelector('#color-btn');
const credit = document.querySelector('#credit');
const creditA = document.querySelector('#credit a');
let squares;

sketchGrid.classList.add('sketch-grid');
gameArea.insertBefore(sketchGrid, credit);
clearBtn.addEventListener('click', clearArea);
sizeDown.addEventListener('click', () => {
  if (gridSize > 4) {
    newSize(-2);
  }
});
sizeUp.addEventListener('click', () => {
  if (gridSize < 30) {
    newSize(2);
  }
});
colorBtn.style["background-color"] = arrayToRGB(colorChoice);
colorBtn.addEventListener('click', randomizeColors);

//functions

function randomizeColors () {
  colorChoice = pickRandomColor(colorChoice);
  colorBtn.style["background-color"] = arrayToRGB(colorChoice);
  squares.forEach(sq => sq.classList.remove('sketched'));
  let colorChoiceBrightness = colorChoice.reduce((a,b) => a+b);
  console.log()
  if (colorChoiceBrightness > 250) {
    colorBtn.style.color = "black";
  } else {
    colorBtn.style.color = "white";
  }
  creditA.style.color = arrayToRGB(colorChoice);
}

function drawArea() {
  for (let i=0; i<gridSize*gridSize; i++){
    let square = document.createElement('div');
    square.classList.add('grid-square');
    sketchGrid.appendChild(square);
  }
  squares = document.querySelectorAll('.grid-square');
  squares.forEach(sq => sq.addEventListener('mouseover', function() {
    if (!sq.classList.contains('sketched')) {
      sq.classList.add('sketched');
      sq.style["background-color"] = getColor(colorChoice);
      sq.style.transition = `background-color 0.1s`;
    }
  }));

  console.log("Drew the area");
}

function clearArea() {
  squares.forEach(sq => {
    sq.style.transition = `background-color ${Math.random()*3}s`;
    sq.style["background-color"] = blankColor;
    // console.log(sq.style.transition);
    // sq.style["background-color"] = "green";
    sq.classList.remove('sketched');
  });
}

function deleteAll() {
  squares.forEach(sq => sq.remove());
}

function newSize(increment) {
  deleteAll();
  gridSize += increment;
  sketchGrid.style["grid-template-columns"] = `repeat(${gridSize}, 1fr)`;
  drawArea();
  if (gridSize == 30) {
    sizeUp.classList.add('max-size');
  } else if (increment < 0 && sizeUp.classList.contains('max-size')) {
    sizeUp.classList.remove('max-size');
  }
  if (gridSize == 4) {
    sizeDown.classList.add('max-size');
  } else if (increment > 0 && sizeDown.classList.contains('max-size')) {
    sizeDown.classList.remove('max-size');
  }
}

function getColor (passedColor) {
  let newColor = passedColor.map(x => {
    x += Math.random()*randomizer - randomizer/2;
    return fixRGB(x);
  });
  console.log(`rgb(${newColor[0]},${newColor[1]},${newColor[2]})`);
  return `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`;
}

function overflowRGB(x) {
  if (x<0) x+= 255
  else if (x>255) x-= 255;
  return x;
}

function fixRGB(x) {
  if (x<0) x=0;
  else if (x>255) x=255;
  return x;
}

function arrayToRGB(array) {
  return `rgb(${array[0]},${array[1]},${array[2]})`;
}

function pickRandomColor(firstColor) {
  let randomFactor = 10;
  let normalR = Math.random()*255;
  let normalG = Math.random()*255;
  let normalB = Math.random()*255;
  let r = ((firstColor[0] + Math.random()*randomizer*randomFactor - randomizer*randomFactor/2)+normalR)/2;
  let g = ((firstColor[1] + Math.random()*randomizer*randomFactor - randomizer*randomFactor/2)+normalG)/2;
  let b = ((firstColor[2] + Math.random()*randomizer*randomFactor - randomizer*randomFactor/2)+normalB)/2;
  return [r,g,b];
}

drawArea();
randomizeColors();
randomizeColors();