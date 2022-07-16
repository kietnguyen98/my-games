// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local
import ButtonCarousel from "./ButtonCarousel";

type slidePuzzlesLayoutProps = {};

const SlidePuzzlesLayout: FunctionComponent<slidePuzzlesLayoutProps> = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-lime-100 via-green-200 to-teal-200 flex justify-center items-center">
      <div className="xl:w-1/2 lg:w-2/3 md:w-2/3 sm:w-3/4 w-5/6 flex flex-col items-center justify-center">
        <img
          src="/images/slide-puzzles/dragonite.webp"
          alt="banner image"
          className="md:w-1/2 w-2/3"
        />
        <div className="lg:w-4/5 w-full bg-slate-50 shadow-lg rounded-md md:p-8 p-4 flex flex-col items-center justify-center gap-8">
          <div className="w-full flex flex-col justify-center items-center">
            <p className="md:text-2xl text-xl uppercase font-bold text-slate-600 text-center flex">
              Hello !, Wellcome to the
            </p>
            <div className="flex items-center justify-center">
              <img
                src="/images/slide-puzzles/pokemon-logo.png"
                className="md:w-1/4 w-1/3"
                alt="pokemon logo"
              />
              <p className="lg:text-3xl md:text-2xl text-xl uppercase font-bold text-slate-600 text-center flex">
                "Slide Puzzle Game"
              </p>
            </div>
          </div>
          <ButtonCarousel />
        </div>
      </div>
    </div>
  );
};

export default SlidePuzzlesLayout;
