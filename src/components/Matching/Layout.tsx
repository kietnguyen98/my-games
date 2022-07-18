// import modules from library
import React, { FunctionComponent } from "react";
import axios from "axios";

// import modules from local
import Board from "./Board";
import Loading from "../Common/Loading";
import CustomButton from "../Common/CustomButton";
import { useNavigate } from "react-router-dom";

type matchingLayoutProps = {};

const MatchingLayout: FunctionComponent<matchingLayoutProps> = () => {
  const [isPLay, setIsPlay] = React.useState(false);
  const navigate = useNavigate();
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

  const [listHighScore, setListHighScore] = React.useState([]);

  const [isHighScoreShow, setIsHighScoreShow] = React.useState(false);
  const [highScoreMode, setHighScoreMode] = React.useState("4x4");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (highScoreMode) {
      const getListHighScore = async () => {
        setIsLoading(true);
        const result = await axios.get(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT + "/users/users",
          {
            params: {
              playMode: highScoreMode,
            },
          }
        );
        if (result?.data?.length > 0) {
          setListHighScore(
            result?.data?.filter((data: any) => data.playMode === highScoreMode)
          );
          setIsLoading(false);
        } else {
          setListHighScore([]);
          setIsLoading(false);
        }
      };
      getListHighScore();
    }
  }, [highScoreMode]);

  return (
    <div className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200">
      <div className="sm:h-screen min-h-screen sm:py-0 py-8  w-full flex items-center justify-center flex-col">
        {isPLay ? (
          <div className="w-full flex items-center justify-center flex-col gap-4">
            {isGameEnd ? null : (
              <p className="text-slate-600 xl:text-2xl md:text-xl text-xl text-center font-bold">
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
                className="px-8 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-slate-50 rounded-md shadow-lg md:text-2xl text-xl"
              >
                Get back
              </button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="w-full flex justify-center items-center">
              <img
                className="xl:w-1/5 lg:w-1/4 md:w-1/3 xs:w-1/3 w-1/2"
                src="/images/matching/pepe-clown.png"
                alt="pepe banner"
              />
            </div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-3/4 w-5/6 bg-slate-50 shadow-md flex flex-col justify-center items-center gap-1 rounded-lg md:p-6 p-4">
              <p className="text-emerald-600 md:text-2xl text-xl text-center font-bold my-2 uppercase">
                Hello !, Welcome to the{" "}
                <p className="tracking-wider md:text-3xl text-2xl">
                  "Pepe Matching Game"
                </p>
              </p>
              <CustomButton
                color="hover:animate-zoomInZoomOut bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 shadow-amber-300/80"
                clickFunction={() => setIsHighScoreShow(true)}
                iconUrl="/images/matching/pepe-typing.gif"
                text="See Leader Board"
              />
              <CustomButton
                color="hover:animate-zoomInZoomOut bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 shadow-sky-300/80"
                clickFunction={() => setIsLevelModalShow(true)}
                iconUrl="/images/matching/pepe-pickles.gif"
                text="Let's do it baby !"
              />
              <CustomButton
                color="hover:animate-zoomInZoomOut bg-gradient-to-r from-zinc-500 via-neutral-500 to-stone-500 shadow-neutral-300/80"
                clickFunction={() => navigate("/")}
                iconUrl="/images/matching/pepe-go-bruh.gif"
                text="Back to menu"
              />
            </div>
          </React.Fragment>
        )}
      </div>
      {isLevelModalShow && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/60">
          <div className="bg-slate-50 m-auto p-4 shadow-xl md:w-1/4 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown">
            <p className="md:text-2xl text-xl text-slate-600 font-bold text-center">
              Choose the level you want to play
            </p>
            <button
              onClick={() => playGame("4x4")}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 py-2 text-slate-50 md:text-2xl text-xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Medium Level (4X4)
            </button>
            <button
              onClick={() => playGame("6x6")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-2 text-slate-50 md:text-2xl text-xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Hard Level (6X6)
            </button>
            <button
              onClick={() => setIsLevelModalShow(false)}
              className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 text-2xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isHighScoreShow && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/60">
          <div className="bg-slate-50 m-auto p-4 shadow-xl xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-2/3 w-5/6 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown">
            <p className="md:text-2xl text-xl text-slate-600 font-bold text-center">
              Top 5 High Score
            </p>
            <div className="w-full flex gap-4">
              {highScoreMode === "4x4" ? (
                <button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 md:text-2xl text-xl text-slate-50 py-1 px-4 shadow-lg rounded-full">
                  4X4 Mode
                </button>
              ) : (
                <button
                  onClick={() => setHighScoreMode("4x4")}
                  className="w-full bg-gradient-to-r from-violet-900 to-fuchsia-900 hover:from-violet-800 hover:to-fuchsia-800 md:text-2xl text-xl text-slate-300 hover:text-slate-100 py-1 px-4 rounded-full"
                >
                  4X4 Mode
                </button>
              )}
              {highScoreMode === "6x6" ? (
                <button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 md:text-2xl text-xl text-slate-50 py-1 px-4 shadow-lg rounded-full">
                  6X6 Mode
                </button>
              ) : (
                <button
                  onClick={() => setHighScoreMode("6x6")}
                  className="w-full bg-gradient-to-r from-violet-900 to-fuchsia-900 hover:from-violet-800 hover:to-fuchsia-800 md:text-2xl text-xl text-slate-300 hover:text-slate-100 py-1 px-4 rounded-full"
                >
                  6X6 Mode
                </button>
              )}
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-4">
              {isLoading ? (
                <Loading />
              ) : listHighScore?.length > 0 ? (
                listHighScore.map((user: any, index: number) => {
                  return (
                    <div
                      key={index + 1}
                      className="w-full py-1 px-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-xl flex justify-start items-center gap-4"
                    >
                      <img
                        className="h-10 w-10"
                        src="/images/matching/pepe-yewling.gif"
                        alt="pepe yewling"
                      />
                      <p className="md:text-xl text-lg text-slate-50">
                        {index +
                          1 +
                          ". " +
                          user.userName +
                          " - " +
                          user.playTime}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-600 md:text-2xl text-xl font-bold">
                  There is no data yet !
                </p>
              )}
            </div>
            <button
              onClick={() => setIsHighScoreShow(false)}
              className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 md:text-2xl text-xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingLayout;
