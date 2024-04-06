// server
const socket = io()

// cashed element references
const selections = document.querySelectorAll('.selections')
const roomDisplay = document.querySelector('.room-display')
const playerDisplay = document.querySelector('.player-display')
const message = document.querySelector('.message-text')
const playerOneSelectionDisplay = document.querySelector('.player-one-selection')
const playerTwoSelectionDisplay = document.querySelector('.player-two-selection')

// variables
let playerOneSelection, playerTwoSelection, myPlayerNumber, room

const gameEndMessage = () => {
  if (playerOneSelection === playerTwoSelection) message.innerText = `You selected the same move. It's a Tie`
  if (playerOneSelection === 'rock') {
    if (playerTwoSelection === 'lizard') {
      message.innerText = `Rock Crushes Lizard. Player One wins.`
    } else if (playerTwoSelection === 'spock') {
      message.innerText = `Spock Vaporizes Rock. Plauer Two wins.`
    } else if (playerTwoSelection === 'scissors') {
      message.innerText = `Rock Crushes Scissors. Player One wins.`
    } else if (playerTwoSelection === 'paper') {
      message.innerText = `Paper Covers Rock. Player Two wins.`
    }
  } else if (playerOneSelection === 'lizard') {
    if (playerTwoSelection === 'spock') {
      message.innerText = `Lizard Poisons Spock. Player One wins.`
    } else if (playerTwoSelection === 'scissors') {
      message.innerText = `Scissors Decapitates Lizard. Player Two wins.`
    } else if (playerTwoSelection === 'paper') {
      message.innerText = `Lizard Eats Paper. Plauer One wins.`
    } else if (playerTwoSelection === 'rock') {
      message.innerText = `Rock Crushes Lizard. Player Two wins.`
    }
  } else if (playerOneSelection === 'spock') {
    if (playerTwoSelection === 'scissors') {
      message.innerText = `Spock Smashes Scissors. Player One wins.`
    } else if (playerTwoSelection === 'paper') {
      message.innerText = `Paper Disproves Spock. Player Two wins.`
    } else if (playerTwoSelection === 'rock') {
      message.innerText = `Spock Vaporizes Rock. Player One wins.`
    } else if (playerTwoSelection === 'lizard') {
      message.innerText = `Lizard Poisons Spock. Player Two wins.`
    }
  } else if (playerOneSelection === 'scissors') {
    if (playerTwoSelection === 'paper') {
      message.innerText = `Scissors Cuts Paper. Player One wins.`
    } else if (playerTwoSelection === 'rock') {
      message.innerText = `Rock Crushes Scissors. Player Two wins.`
    } else if (playerTwoSelection === 'lizard') {
      message.innerText = `Scissors Decapitates Lizard. Player One wins.`
    } else if (playerTwoSelection === 'spock') {
      message.innerText = `Spock Smashes Scissors. Player Two wins.`
    }
  } else if (playerOneSelection === 'paper') {
    if (playerTwoSelection === 'rock') {
      message.innerText = `Paper Covers Rock. Player One wins.`
    } else if (playerTwoSelection === 'lizard') {
      message.innerText = `Rock Crushes Lizard. Player Two wins.`
    } else if (playerTwoSelection === 'spock') {
      message.innerText = `Paper Disproces Spock. Player One wins.`
    } else if (playerTwoSelection === 'scissors') {
      message.innerText = `Scissors Cuts Paper. Player Two wins.`
    }
  } else {
    message.innerText = 'andy.. u fucked up.'
  }
}

// backend communication
const sendSelection = (e) => {
  e.preventDefault
  const selectionData = {
    selection: e.srcElement.innerText,
    player: myPlayerNumber,
    room: room
  }
  socket.emit('selection', selectionData)
}
selections.forEach(selection => {
  selection.addEventListener('click', sendSelection)
})
const assignRoom = (roomData) => {
  room = roomData
  roomDisplay.innerText = room
}
const assignPlayer = (playerData) => {
  playerDisplay.innerText = `You are Player ${playerData}`
  myPlayerNumber = playerData
}

const allPlayersJoined = (data) => {
  message.innerText = data
}

const handlePlayerSelection = (selectionData) => {
  if (selectionData.player === 1)  {
    playerOneSelection = selectionData.selection
    playerOneSelectionDisplay.innerText = 'Player 2 Selected'
  }
  if (selectionData.player === 2) {
    playerTwoSelection = selectionData.selection
    playerTwoSelectionDisplay.innerText = 'Player 1 Selected'
  }
  if (playerOneSelection !== undefined && playerTwoSelection !== undefined) {
    socket.emit('reveal', room)
  }
}

const handleReveal = () => {
  playerOneSelectionDisplay.innerText = playerOneSelection
  playerTwoSelectionDisplay.innerText = playerTwoSelection
  gameEndMessage()
}

const playerDisconnected = (data) => {
  message.innerText = data
  isGameOn = false
  playerOneSelection = undefined
  playerTwoSelection = undefined
}

socket.on('join-room', roomData => assignRoom(roomData))
socket.on('player-join', playerData => assignPlayer(playerData))
socket.on('both-joined', data => allPlayersJoined(data))
socket.on('selection', selectionData => handlePlayerSelection(selectionData))
socket.on('reveal', () => handleReveal())
socket.on('player-disconnected', data => playerDisconnected(data))
