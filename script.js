const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const WinnerMessageTextElement = document.querySelector('[data-winning-mensage-text]')
const WinnerMessage = document.querySelector('[data-winning-mensage]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    isCircleTurn = false

    for (const cell of cellElements) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click', handleclick, { once:true })
    } 

    setBoardHoverClass()
    WinnerMessage.classList.remove('show-winning-message')
}

const endGame = (isDraw) => {
    if (isDraw) {
        WinnerMessageTextElement.innerHTML = "empate!"
    } else {
        WinnerMessageTextElement.innerHTML = isCircleTurn ? 'O Venceu' : 'X venceu'
    }

    WinnerMessage.classList.add('show-winning-message')
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}
  
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')  

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const swapTurn = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
}

const handleclick = (e) => {
    // colocar a marca (X ou circulo)
        const cell = e.target
        const classToAdd = isCircleTurn ? 'circle' : 'x'

        placeMark(cell, classToAdd)
    // verificar por vitoria
        const isWin = checkForWin(classToAdd)

        if (isWin) {
            
        }
    // verificar por empate
        const isDraw = checkForDraw()

        if (isWin) {
            endGame(false)
        } else if (isDraw) {
            endGame(true)
        } else {
    //mudar o simbolo
            swapTurn()        
        }
}

startGame()

restartButton.addEventListener('click', startGame)