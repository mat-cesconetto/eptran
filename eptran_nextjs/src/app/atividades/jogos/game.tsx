import React from "react";

interface GameProps {
  imageUrl: string;
  title: string;
}

const Game: React.FC<GameProps> = ({ imageUrl, title }) => {
  return (
    <div
      className={`w-[140px] sm:w-[260px] rounded-xl h-[140px] sm:h-[260px] m-2 sm:m-20 bg-cover flex flex-col justify-end transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain cursor-pointer mb-4`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="w-full h-12 sm:h-20 bg-black bg-opacity-60 rounded-b-2xl lg:rounded-b-3xl flex items-center justify-center">
        <h2 className="text-white font-semibold text- sm:text-2xl">{title}</h2>
      </div>
    </div>
  );
};

export default Game;
