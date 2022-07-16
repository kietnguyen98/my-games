// import modules from library
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
// import modules from local

type gameViewCardProps = {
  gameName: string;
  gameViewImageUrl: string;
  directUrl: string;
};

const GameViewCard: FunctionComponent<gameViewCardProps> = ({
  gameName,
  gameViewImageUrl,
  directUrl,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <p className="text-xl font-bold text-amber-500 tracking-wider uppercase text-center">
        {gameName}
      </p>
      <div
        className={`w-full pt-[80%] ${gameViewImageUrl} bg-center bg-cover bg-no-repeat rounded-md transition-all ease-in-out duration-300 shadow-sm hover:shadow-xl cursor-pointer shadow-cyan-500/50 hover:shadow-cyan-500/50`}
      ></div>
      <button
        onClick={() => navigate(directUrl)}
        className="px-8 py-2 text-lg text-slate-50 font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:animate-zoomInZoomOut shadow-lg shadow-fuchsia-500/50"
      >
        Play the game !
      </button>
    </div>
  );
};

export default GameViewCard;
