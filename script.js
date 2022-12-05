//initial data
let table = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: '',
}

let turn = ''
let warning = ''
let playing = false

reset()

//Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', itemClick)
})

//Functions

function itemClick(e){
  let item = e.target.getAttribute('data-item')
  if(playing && table[item] === ''){
    table[item] = turn
    renderTable()
    togglePlayer()
  }
}

function reset(){
  warning = ''

  let random = Math.floor(Math.random() * 2)
  turn = (random === 0) ? 'x' : 'o'

  for(let i in table){
    table[i] = ''
  }

  playing = true;

  renderTable()
  renderInfo()
}

function renderTable(){
  for(let i in table){
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = table[i]
  }
  checkGame()
}

function renderInfo(){
  document.querySelector('.vez').innerHTML = turn
  document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer(){
  turn = (turn === 'x') ? 'o' : 'x'
  renderInfo()
}

function checkGame(){
  if(checkWinnerFor('x')){
    warning = "The 'X' is the winner"
    playing = false
  }else if(checkWinnerFor('o')){
    warning = "The 'O' is the winner"
    playing = false
  }else if (isFull()) {
    warning = "Draw game"
    playing = false
  }
}

function checkWinnerFor(turn){
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for(let w in pos){
    let pArray = pos[w].split(',') //a1,a2,a3
    let hasWon = pArray.every(option => table[option] === turn)
    if(hasWon) return true
  }
  return false
}

function isFull(){
  for(let i in table){
    if(table[i] === ''){
      return false
    }
  }

  return true
}