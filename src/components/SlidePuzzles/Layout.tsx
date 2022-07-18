// import modules from library
import React, { FunctionComponent } from "react";
import ButtonCarousel from "./ButtonCarousel";
import CustomButton from "../Common/CustomButton";
import { useNavigate } from "react-router-dom";

// import modules from local
import SlidePuzzlesBoard from "./Board";

type slidePuzzlesLayoutProps = {};

const SlidePuzzlesLayout: FunctionComponent<slidePuzzlesLayoutProps> = () => {
  // game play general logic
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = React.useState(false);

  const getBack = () => {
    setIsPlay(false);
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-lime-100 via-green-200 to-teal-200 flex justify-center items-center">
      {isPlay ? (
        <div className="w-full flex items-center justify-center flex-col gap-10 sm:py-0 py-8">
          <p className="text-slate-600 text-2xl text-center font-bold">
            Playing Slide Puzzles Game...
          </p>
          <div>
            <SlidePuzzlesBoard />
          </div>
          <div>
            <button
              onClick={getBack}
              className="px-8 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-slate-50 rounded-md shadow-md hover:shadow-xl hover:shadow-blue-300/80 md:text-2xl text-xl transition-all duration-300"
            >
              Get back
            </button>
          </div>
        </div>
      ) : (
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
            <ButtonCarousel
              listComponent={[
                <CustomButton
                  color="my-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 shadow-amber-300/80"
                  clickFunction={() => setIsPlay(true)}
                  iconUrl="/images/slide-puzzles/pikachu-icon.png"
                  text="start the game"
                />,
                <CustomButton
                  color="my-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 shadow-sky-300/80"
                  clickFunction={() => alert("zxcxzc")}
                  iconUrl="/images/slide-puzzles/pikachu-icon.png"
                  text="see leader board"
                />,
                <CustomButton
                  color="my-4 bg-gradient-to-r from-zinc-500 via-neutral-500 to-stone-500 shadow-neutral-300/80"
                  clickFunction={() => navigate("/")}
                  iconUrl="/images/slide-puzzles/pikachu-icon.png"
                  text="back to menu"
                />,
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidePuzzlesLayout;
