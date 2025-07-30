# Game Lobby System FE

## Approach

This project implements a real-time game lobby system where users can join sessions, pick numbers, and compete to win. The backend is built with Node.js, Express, TypeScript, and MongoDB, while the frontend (this repo) is built with React and TypeScript. The system uses JWT-based authentication and polling for real-time updates. Sessions auto-cycle, and a leaderboard tracks top players.

## Demo

[Live Demo](https://game-lobby-system-fe.vercel.app/)

## Repository

[FE GitHub Repository](https://github.com/shadrxcc/game-lobby-system-fe)
[BE GitHub Repository](https://github.com/shadrxcc/game-lobby-system-be)

## Setup Instructions

1. Clone the repository
2. Run `yarn install` or `npm install`
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Start the development server with `yarn dev` or `npm run dev`


## 🎮 Game Overview

- **Session Duration**: 20 seconds per game
- **Number Range**: Players pick numbers 1-10 with a random number selected at session end
- **Auto-restart**: Sessions automatically restart with 10 second breaks
- **Leaderboard**: Top 10 players are tracked by wins

## 🏗️ Architecture

### Tech Stack
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Real-time**: 1 sec polling-based status updates

### Key Features
- ✅ User authentication (username-based)
- ✅ Real-time session management
- ✅ Automatic session cycling
- ✅ Leaderboard system

## 🔄 Game Flow

1. **User Registration/Login**
   - User provides username
   - Receives JWT token for authentication

2. **Session Joining**
   - User joins active session via `/session/join` if session time still running
   - No number picking at this stage

3. **Number Selection**
   - User navigates to game page on successfully joining the session
   - Picks number 1-10 with `/session/pick`
   - Waits for session to end to see result
   - Check for when user navigates to game page manually, if a session is active, they auto join, else get redirected back to the lobby.

4. **Results & Auto-restart**
   - Session ends after 20 seconds
   - Results are displayed during 10-second break
   - New session automatically starts
   - Users auto-rejoin new session 

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Yarn or npm

### Installation
```bash
# Install dependencies
yarn install

# Set environment variables
cp .env.example .env
# Add your MONGODB_URI and JWT_SECRET

# Start development server
yarn dev
```

## 📝 License

MIT License - feel free to use this project for learning and development. 