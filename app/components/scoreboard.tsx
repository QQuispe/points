import React from 'react';

type ScoreboardProps = {
  players: string[];
  rounds: number[];
  scores: number[][];
  updateScore: (roundIndex: number, playerIndex: number, score: number) => void;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ players, rounds, scores, updateScore }) => {
  // Calculate running total per player
  const runningTotal: number[] = scores[0].map((_, playerIndex) =>
    scores.reduce((sum, round) => sum + round[playerIndex], 0)
  );

  return (
    <section>
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            {players.map((player, index) => (
              <th key={index}>{player}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((round, roundIndex) => (
            <tr key={roundIndex}>
              <td>Round {rounds[roundIndex]}</td>
              {round.map((score, playerIndex) => (
                <td key={playerIndex}>
                  <input
                    className="p-2 mx-2 rounded"
                    type="number"
                    value={score}
                    onChange={(event) => {
                      const input = event.target as HTMLInputElement;
                      const newScore = parseInt(input.value, 10) || 0;
                      updateScore(roundIndex, playerIndex, newScore);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Total</td>
            {runningTotal.map((total, playerIndex) => (
              <td className="p-4" key={playerIndex}>{total}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Scoreboard;
