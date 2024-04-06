import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const rooms = {}

io.on('connection', socket => {
  console.log(`User ${socket.id} connected!`)
  const MAX_ROOM_NUMBER = 10

  const joinRoomWithSpace = () => {
    for (let i = 1; i <= MAX_ROOM_NUMBER; i++) {
      const roomKey = `room ${i}`
      if (!rooms[roomKey]) {
        rooms[roomKey] = { playerOne: null, playerTwo: null };
      }

      // Check if there's space available in the room
      if (!rooms[roomKey].playerOne || !rooms[roomKey].playerTwo) {
        return roomKey
      }
    }
    return null
  }

  const room = joinRoomWithSpace()

  const handleConnectRoom = (room) => {
    if (room) {
      socket.join(room)
      socket.emit('join-room', room)
      let playerRoleAssigned = false
      if (!rooms[room].playerOne) {
        rooms[room].playerOne = socket.id
        socket.playerNumber = 1
        playerRoleAssigned = true
      } else if (!rooms[room].playerTwo) {
        rooms[room].playerTwo = socket.id
        socket.playerNumber = 
        playerRoleAssigned = true
      }

      if (playerRoleAssigned) {
        console.log(`User ${socket.id} joined ${room} as Player ${socket.playerNumber}`)
        socket.emit('player-join', socket.playerNumber)
      }

      if (rooms[room].playerOne && rooms[room].playerTwo) {
        io.to(room).emit('both-joined', 'Both Players Are Here')
      }
    } else {
      console.log('All rooms are full.')
    }
  }

  handleConnectRoom(room)

  const handlePlayerSelection = (selectionData) => {
    io.to(selectionData.room).emit('selection', selectionData)
  }
  const revealSelections = (room) => {
    io.to(room).emit('reveal')
  }

  socket.on('selection', selectionData => handlePlayerSelection(selectionData))
  socket.on('reveal', room => revealSelections(room))

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected.`)
    Object.keys(rooms).forEach(roomKey => {
      const room = rooms[roomKey]
      let playerDisconnected = false
      if (room.playerOne === socket.id) {
        room.playerOne = null
        playerDisconnected = true
      } else if (room.playerTwo === socket.id) {
        room.playerTwo = null
        playerDisconnected = true
      }

      if (playerDisconnected) {
        io.to(roomKey).emit('player-disconnected', `A player has left ${roomKey}`)
        // Check if the room is now empty and delete it if so
        if (!room.playerOne && !room.playerTwo) {
          delete rooms[roomKey]
          console.log(`Room ${roomKey} is now empty and has been deleted.`)
        }
      }
    })
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
