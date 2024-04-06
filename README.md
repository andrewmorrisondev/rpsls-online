# Rock Paper Scissors Lizard Spock - Multiplayer Game

Welcome to the **Rock Paper Scissors Lizard Spock Multiplayer Game**, an exciting twist on the classic hand game that allows players from different locations to compete against each other in real-time. This game extends the traditional Rock-Paper-Scissors by introducing two more gestures - Lizard and Spock, making the game more fun and reducing the chances of a tie. Built with modern web technologies, this game showcases seamless real-time communication and interaction between players through a simple, user-friendly interface.

## Features

- **Real-time Gameplay**: Engage in the classic game with an extended twist in real-time. No refreshes needed!
- **Multiplayer Support**: Play against another player in a one-on-one online setup.
- **Dynamic Room Allocation**: Automatically join a room with space for playing, supporting up to 10 rooms simultaneously.
- **Live Game Status**: Real-time updates for player moves, game outcomes, and player connections/disconnections.
- **Cross-browser Support**: Compatible with modern web browsers, thanks to comprehensive CORS settings.
- **Simple and Intuitive UI**: Easy-to-use interface, focusing solely on the game experience.

## Technology Stack

This game leverages a variety of technologies to provide a smooth and responsive user experience:

- **Frontend**: Vanilla JavaScript for handling UI interactions and Socket.IO client for real-time web socket communication.
- **Backend**: Node.js server with Socket.IO for managing real-time bidirectional event-based communication.
- **Deployment**: Designed to be easily deployable on any platform supporting Node.js.

## Getting Started

To run this game locally, follow these steps:

1. **Clone the Repository**

   Start by cloning this repository to your local machine.

2. **Install Dependencies**

   Navigate to the cloned directory and run `npm install` to install all necessary dependencies for the server.

3. **Start the Server**

   Execute `nodemon` to start the server. It will listen on port 3000.

4. **Access the Game**

   Open your web browser and go to `http://localhost:3000` to start playing.

## How to Play

- **Join the Game**: Automatically join an available room as soon as you visit the site. If all rooms are full, you might have to wait.
- **Select Your Move**: Choose between Rock, Paper, Scissors, Lizard, or Spock by clicking on the corresponding button on the screen.
- **Game Outcome**: The game will display the result, indicating whether you won, lost, or tied, based on the selections made by both players.
- **Play Again**: The game allows for continuous play, so you can keep playing as many times as you want.

## Rules

The game follows the standard rules of Rock Paper Scissors Lizard Spock:

- Scissors cuts Paper
- Paper covers Rock
- Rock crushes Lizard
- Lizard poisons Spock
- Spock smashes Scissors
- Scissors decapitates Lizard
- Lizard eats Paper
- Paper disproves Spock
- Spock vaporizes Rock
- (and as it always has) Rock crushes Scissors

## Contributions

Contributions are welcome! If you have ideas on how to improve this game or add new features, feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the MIT License.