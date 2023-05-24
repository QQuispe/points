"use client";
import Head from "next/head";
import AddPlayer from "./components/addPlayer";
import Scoreboard from "./components/scoreboard";
import Header from "./components/header";
import SelectGame from "./components/selectGame";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

// Home component
export default function Home() {
  const [players, setPlayers] = useState<string[]>([]);
  const [rounds, setRounds] = useState<number[]>([]);
  const [scores, setScores] = useState<number[][]>([]);
  const [gameSelected, setGameSelected] = useState(false);
  const [winner, setWinner] = useState("");
  const [runningTotal, setRunningTotal] = useState<number[]>([]);
  const [showGameWinnerModal, setShowGameWinnerModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");

  // GameWinnerModal component
  const GameWinnerModal: React.FC<{ winner: string; onClose: () => void }> = ({
    winner,
    onClose,
  }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Game Ended</h2>
          <p>{winner} won the game!</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const addPlayer = (name: string) => {
    setPlayers([...players, name]);
    setScores(scores.map((round) => [...round, 0]));
    setRunningTotal([...runningTotal, 0]);
  };

  const addRound = () => {
    setRounds([...rounds, rounds.length + 1]);
    setScores([...scores, new Array(players.length).fill(0)]);
  };

  const updateScore = (
    roundIndex: number,
    playerIndex: number,
    score: number
  ) => {
    const newScores = [...scores];
    newScores[roundIndex][playerIndex] = score;
    setScores(newScores);
    calculateRunningTotal(playerIndex);
    checkGameEnd(playerIndex);
  };

  const selectGame1 = () => {
    setSelectedGame("Rumy");
    setGameSelected(true);
  };

  const startGame = () => {
    setRounds([1]);
    setScores([new Array(players.length).fill(0)]);
    setRunningTotal(new Array(players.length).fill(0));
  };

  const resetGame = () => {
    setPlayers([]);
    setRounds([]);
    setScores([]);
    setGameSelected(false);
    setWinner("");
    setRunningTotal([]);
  };

  const calculateRunningTotal = (playerIndex: number) => {
    const total = scores.reduce((sum, round) => sum + round[playerIndex], 0);
    setRunningTotal((prevTotal) => {
      const newTotal = [...prevTotal];
      newTotal[playerIndex] = total;
      return newTotal;
    });
  };

  const checkGameEnd = (playerIndex: number) => {
    if (runningTotal[playerIndex] >= 500) {
      setWinner(players[playerIndex]);
      setShowGameWinnerModal(true);
    }
  };

  const closeGameWinnerModal = () => {
    setShowGameWinnerModal(false);
  };

  return (
    <div className="px-4 py-2">
      <Head>
        <title>Points</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center">
        {!gameSelected && <SelectGame selectGame={selectGame1} />}

        {gameSelected && selectedGame === "Rumy" && (
          <div>
            <h1>2. Add Players</h1>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
            <AddPlayer addPlayer={addPlayer} />
            {rounds.length === 0 && (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                onClick={startGame}
                disabled={players.length < 2}
              >
                {players.length < 2 ? "Start (Minimum 2 players)" : "Start"}
              </button>
            )}
            {rounds.length > 0 && (
              <div>
                <Scoreboard
                  players={players}
                  rounds={rounds}
                  scores={scores}
                  updateScore={updateScore}
                />

                <div className="flex justify-between">
                  <button
                    className="flex items-center px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-400"
                    onClick={addRound}
                  >
                    <FaPlus className="mr-2" />
                    Add Round
                  </button>

                  <button
                    className="flex items-center px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-400"
                    onClick={resetGame}
                  >
                    Reset Game
                  </button>
                </div>
              </div>
            )}
            {showGameWinnerModal && (
              <GameWinnerModal winner={winner} onClose={closeGameWinnerModal} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
