import React from "react";
import "./styles/App.css";
import GameViewCard from "./components/Common/GameViewCard";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-teal-100 via-cyan-100 to-sky-200 flex justify-center items-center flex-col px-0 py-8">
      <div className="xl:w-3/4 lg:w-3/4 md:w-4/5 sm:w-4/5 w-5/6 flex flex-col gap-20 justify-center items-center">
        <p className="text-center text-slate-600 font-bold lg:text-2xl md:text-2xl text-xl">
          wellcome to kiet's games homepage, these are some famous games develop
          by KietNguyen. Please, try to play as much as you like.
          <p>Hope you love these games !</p>
        </p>
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 justify-center items-center">
          <GameViewCard
            gameName="pepe matching game"
            gameViewImageUrl="bg-matching-view"
            directUrl="/pepe-matching"
          />
          <GameViewCard
            gameName="pepe matching game"
            gameViewImageUrl="bg-matching-view"
            directUrl="/pepe-matching"
          />
          <GameViewCard
            gameName="pepe matching game"
            gameViewImageUrl="bg-matching-view"
            directUrl="/pepe-matching"
          />
        </div>
      </div>
      <div className="mb-0 lg:mt-auto mt-16">
        <p className="text-slate-500 text-md">
          copyright since 2022 by KietNguyen98. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
