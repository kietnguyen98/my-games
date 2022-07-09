// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local
import Board from "./Board";

type matchingLayoutProps = {};

const MatchingLayout: FunctionComponent<matchingLayoutProps> = () => {
  const [isPLay, setIsPlay] = React.useState(false);

  const playGame = (level: string) => {
    window.localStorage.setItem("matchingPlay", "yes");
    window.localStorage.setItem("level", level);
    setIsLevelModalShow(false);
    setIsPlay(true);
  };

  const getBack = () => {
    window.localStorage.setItem("matchingPlay", "no");
    setIsPlay(false);
  };

  React.useEffect(() => {
    if (window.localStorage.getItem("matchingPlay") === "yes") {
      setIsPlay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  React.useEffect(() => {
    if (window.localStorage.getItem("matchingPlay") === "yes") {
      setIsPlay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLevelModalShow, setIsLevelModalShow] =
    React.useState<boolean>(false);

  const [isGameEnd, setIsGameEnd] = React.useState(false);

  return (
    <React.Fragment>
      <div className="sm:h-screen min-h-screen sm:py-0 py-8  w-full flex items-center justify-center flex-col xl:gap-8 md:gap-4 gap-8">
        {isPLay ? (
          <React.Fragment>
            {isGameEnd ? null : (
              <p className="text-slate-600 xl:text-xl md:text-md text-center font-bold">
                Playing Matching Game ...
              </p>
            )}
            <div>
              <Board
                gameEnd={() => {
                  setIsGameEnd(true);
                }}
              />
            </div>
            <div>
              <button
                onClick={getBack}
                className="px-4 py-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-md text-slate-50 rounded-md shadow-lg text-md"
              >
                Get back
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="w-full flex justify-center items-center">
              <div className="w-64 h-40 bg-banner bg-no-repeat bg-cover bg-center"></div>
            </div>
            <p className="text-slate-600 md:text-2xl text-xl text-center font-bold md:px-0 px-8">
              Hello !, Welcome to the "Pepe Matching" game
            </p>
            <div className="">
              <button
                onClick={() => setIsLevelModalShow(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-md animtaion-all duration-300 hover:animate-zoomInZoomOut shadow-lg flex gap-4 justify-center items-center"
              >
                <img
                  className="h-8 w-8"
                  src="/images/matching/pepe-pickles.gif"
                  alt="pepe pickles"
                />
                <p className="text-lg text-slate-50">Let's do it baby!</p>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
      {isLevelModalShow && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/60">
          <div className="bg-slate-50 m-auto p-4 shadow-xl md:w-1/4 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-4 animate-dropDown">
            <p className="text-md text-slate-600 font-bold">
              Choose the level you want to play
            </p>
            <button
              onClick={() => playGame("4x4")}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 py-2 text-slate-50 text-md text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Medium Level (4X4)
            </button>
            <button
              onClick={() => playGame("6x6")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-2 text-slate-50 text-md text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Hard Level (6X6)
            </button>
            <button
              onClick={() => setIsLevelModalShow(false)}
              className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 text-md text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MatchingLayout;
