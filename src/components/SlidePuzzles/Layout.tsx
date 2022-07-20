/* eslint-disable jsx-a11y/img-redundant-alt */
// import modules from library
import React, { FunctionComponent } from "react";
import ButtonCarousel from "./ButtonCarousel";
import CustomButton from "../Common/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import modules from local
import SlidePuzzlesBoard from "./Board";
import Loading from "../Common/Loading";
import apiRoutes from "../../utils/apiRoutes";

type slidePuzzlesLayoutProps = {};

const SlidePuzzlesLayout: FunctionComponent<slidePuzzlesLayoutProps> = () => {
  // game play general logic
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = React.useState(false);

  const getBack = () => {
    setIsPlay(false);
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isHighScoreShow, setIsHighScoreShow] = React.useState<boolean>(false);
  const [listHighScore, setListHighScore] = React.useState<Array<Object>>([]);

  React.useEffect(() => {
    if (isHighScoreShow) {
      const getListHighScore = async () => {
        setIsLoading(true);
        const result = await axios.get(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT +
            apiRoutes.GET_ALL_SLIDE_PUZZLES_HIGH_SCORE
        );
        if (result?.data?.length > 0) {
          setListHighScore(result?.data);
          setIsLoading(false);
        } else {
          setListHighScore([]);
          setIsLoading(false);
        }
      };
      getListHighScore();
    }
  }, [isHighScoreShow]);

  return (
    <React.Fragment>
      <div className="min-h-screen w-full bg-gradient-to-r from-lime-100 via-green-200 to-teal-200 flex justify-center items-center">
        {isPlay ? (
          <div className="w-full flex items-center justify-center flex-col gap-10 sm:py-0 py-8">
            <SlidePuzzlesBoard />
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
                    clickFunction={() => setIsHighScoreShow(true)}
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
      {isHighScoreShow && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/70">
          <div className="bg-slate-50 m-auto p-4 shadow-xl xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-2/3 w-5/6 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown">
            <p className="md:text-2xl text-xl text-slate-600 font-bold text-center">
              Top 5 High Score
            </p>
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
                        src="/images/slide-puzzles/pikachu.gif"
                        alt="lovely pikachu"
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
    </React.Fragment>
  );
};

export default SlidePuzzlesLayout;
