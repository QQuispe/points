import React from "react";

const SelectGame: React.FC<{ selectGame: () => void }> = ({ selectGame }) => {
  return (
    <section>
      <h1 className="text-2xl text-center p-2">Select a game:</h1>
      <div >
        <button
          className="px-4 py-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-400"
          onClick={selectGame}
        >
          Rumy
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
          Game 2
        </button>
      </div>
    </section>
  );
};

export default SelectGame;
