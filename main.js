let body = document.querySelector('body')
let container = document.querySelector('#container')
let clearBtn = document.querySelector('#button-clear')
let inputRange = document.querySelector('#range')
let labelRange = document.querySelector('#label-range')
let buttons = document.querySelector('.buttons')
let erasor = document.querySelector('.erasorButton')
let title = document.querySelector('h1')

let gridSize = 16
let color = 'black'
let isClicking = true

buttons.addEventListener('click', (e) => {
  color = e.target.innerText.toLowerCase()
})

inputRange.addEventListener('input', (e) => {
  gridSize = e.target.value
  resetSketchPad()
  createGrid(gridSize)
  labelRange.textContent = e.target.value
})

function createGrid(size) {
  let board = document.querySelector('#sketch-window')
  let squares = board.querySelectorAll('div')
  squares.forEach((div) => div.remove())
  board.style.gridTemplateColumns = `repeat(${size} , 1fr)`
  board.style.gridTemplateRows = `repeat(${size} , 1fr)`

  for (let i = 0; i < size * size; i++) {
    let square = document.createElement('div')
    square.addEventListener('mouseover', colorSquare)
    square.style.backgroundColor = 'white'
    board.insertAdjacentElement('beforeend', square)
  }
}

createGrid(gridSize)

function colorSquare() {
  if (isClicking) {
    if (color === 'random') {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
    } else if (color === 'erasor') {
      this.style.backgroundColor = 'white'
    } else {
      this.style.backgroundColor = color
    }
  }
}

function resetSketchPad() {
  let board = document.querySelector('#sketch-window')
  let squares = board.querySelectorAll('div')
  squares.forEach((div) => (div.style.backgroundColor = 'white'))
}

clearBtn.addEventListener('click', resetSketchPad)

body.addEventListener('click', (e) => {
  if (e.target.tagName != 'BUTTON') {
    isClicking = !isClicking
    if (isClicking) {
      title.textContent = 'Sketchpad mode: painting'
    } else {
      title.textContent = 'Sketchpad mode: not painting'
    }
  }
})
