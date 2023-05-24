import React, { useState } from "react";

type AddPlayerProps = {
  addPlayer: (name: string) => void;
};

const AddPlayer: React.FC<AddPlayerProps> = ({ addPlayer }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim()) {
      addPlayer(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <input
        className="rounded p-2"
        type="text"
        placeholder="Player name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-400"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayer;
