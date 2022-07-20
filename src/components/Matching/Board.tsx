// import modules from library
import React, { FunctionComponent } from "react";
import axios from "axios";
// import modules from local
import Card from "./Card";
import Loading from "../Common/Loading";
import AnnoucementModal from "../Common/AnnoucementModal";
import Clock from "../Common/Clock";
import { displayPlayTime } from "../../utils/custom-functions";

type boardProps = {
  gameEnd: any;
};

const Board: FunctionComponent<boardProps> = ({ gameEnd }) => {
  const [boardSize, setBoardSize] = React.useState(
    window.localStorage.getItem("level") === "4x4" ? 4 : 6
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOnTop, setIsOnTop] = React.useState(false);

  React.useEffect(() => {
    if (window) {
      setIsLoading(true);
      setBoardSize(window.localStorage.getItem("level") === "4x4" ? 4 : 6);

      const getListHighScore = async (playMode: string) => {
        const result = await axios.get(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT + "/users/users",
          {
            params: {
              playMode: playMode,
            },
          }
        );

        const listHighScore = result?.data;
        if (listHighScore.length === 5) {
          for (let i = 0; i < listHighScore.length; i++) {
            if (timerString.localeCompare(listHighScore[i].playTime) < 0) {
              setIsOnTop(true);
              return setIsLoading(false);
            }
          }
        } else {
          setIsOnTop(true);
          return setIsLoading(false);
        }
        return setIsLoading(false);
      };

      getListHighScore(window?.localStorage?.getItem("level") ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  const [cardArray, setCardArray] = React.useState<Array<number>>([]);
  const [flippedCardList, setFlippedCardList] = React.useState<Array<number>>(
    []
  );
  const [resultArray, setResultArray] = React.useState<Array<number>>([]);

  React.useMemo(() => {
    const shuffleArray: (array: Array<number>) => Array<number> = function (
      array: Array<number>
    ): Array<number> {
      var currentIndex = array.length;
      var randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    };

    if (boardSize > 0 && cardArray.length === 0) {
      var tempArray: Array<number> = [];

      for (let i = 1; i <= Math.pow(boardSize, 2) / 2; i++) {
        tempArray[i - 1] = i;
        tempArray[Math.pow(boardSize, 2) - i] = i;
      }

      tempArray = shuffleArray(tempArray);
      setCardArray(tempArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize]);

  // card Flip logic here

  const cardFlip = (cardIndex: number) => {
    var tempArray: Array<number> = [...flippedCardList];
    tempArray.push(cardIndex);
    setFlippedCardList(tempArray);
  };

  const [cardToHide, setCardToHide] = React.useState<Array<number>>([]);

  const removeIndexFromCardToHide = (cardIndex: number) => {
    let tempArray: Array<number> = [...cardToHide].filter(
      (val) => val !== cardIndex
    );
    setCardToHide(tempArray);
  };

  React.useEffect(() => {
    if (flippedCardList.length === 2) {
      if (flippedCardList[0] === flippedCardList[1]) {
        let tempArray: Array<number> = [...resultArray];
        tempArray.push(flippedCardList[0]);
        setTimeout(() => {
          setResultArray(tempArray);
        }, 500);
        setFlippedCardList([]);
        setUserPoint((prev) => prev + 1);
      } else {
        let tempArray: Array<number> = [];
        tempArray.push(flippedCardList[0], flippedCardList[1]);
        setCardToHide(tempArray);
        setFlippedCardList([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCardList]);

  // user point logic here

  const [userPoint, setUserPoint] = React.useState<number>(0);

  const [isDone, setIsDone] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (userPoint === Math.pow(boardSize, 2) / 2) {
      setTimeout(() => {
        setIsDone(true);
        gameEnd();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPoint]);

  const [timerString, setTimerString] = React.useState<string>("00:00:00");

  // user submit to highscore board
  const [userName, setUserName] = React.useState("");
  const [userSubmitSuccessfully, setUserSubmitSuccessfully] =
    React.useState(false);
  const [alertModalContent, setAlertModalContent] = React.useState("");

  const userSubmitInfo = () => {
    if (!userName) {
      alert("You haven't enter your name yet ");
    } else {
      const createNewUser = async (userName: string) => {
        setIsLoading(true);
        const highScoreResult = await axios.get(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT + "/users/users",
          {
            params: {
              playMode: window.localStorage.getItem("level"),
            },
          }
        );

        for (let i = 0; i < highScoreResult?.data.length; i++) {
          if (
            highScoreResult?.data[i].userName.toLowerCase() ===
            userName.toLowerCase()
          ) {
            setIsLoading(false);
            return setAlertModalContent(
              "This username is already in use, please choose another name !"
            );
          }
        }

        const result = await axios.post(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT + "/users/add-user",
          {
            userName: userName,
            playMode: window.localStorage.getItem("level"),
            playTime: timerString,
          }
        );
        if (result?.status === 200) {
          setUserName("");
          setUserSubmitSuccessfully(true);
          setIsLoading(false);
          return setAlertModalContent("Submit information successfully !");
        } else {
          setUserName("");
          setIsLoading(false);
          return setAlertModalContent("An error occurred, please try again !");
        }
      };

      createNewUser(userName);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          {!isDone && (
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <Clock
                isDone={isDone}
                isStart={true}
                getTimeString={(val: string) => setTimerString(val)}
              />
              <div className="flex justify-center border-solid border-4 border-cyan-500 px-4 py-0 rounded-full bg-slate-50">
                <p className="text-xl text-center text-slate-600">
                  Your Point:{" "}
                  <span className="font-bold text-sky-500">
                    {userPoint} / {Math.pow(boardSize, 2) / 2}
                  </span>
                </p>
              </div>
            </div>
          )}
          {isDone ? (
            <div className="w-full flex justify-center flex-col items-center gap-8 sm:px-0 px-4">
              <p className="text-3xl text-cyan-500 text-center font-bold uppercase">
                Congratulations !, you have finished the game
              </p>
              <div className="w-full flex justify-center gap-1">
                <img
                  className="lg:h-40 lg:w-40 sm:h-32 sm:w-32 w-24 h-24"
                  src="/images/matching/pepe-congratulation.gif"
                  alt="pepe congrate"
                />
                <img
                  className="lg:h-40 lg:w-40 sm:h-32 sm:w-32 w-24 h-24"
                  src="/images/matching/pepe-congratulation.gif"
                  alt="pepe congrate"
                />
                <img
                  className="lg:h-40 lg:w-40 sm:h-32 sm:w-32 w-24 h-24"
                  src="/images/matching/pepe-congratulation.gif"
                  alt="pepe congrate"
                />
              </div>
              <p className="text-2xl text-cyan-700 text-center">
                your playtime is {displayPlayTime(timerString)}
              </p>
              {!userSubmitSuccessfully ? (
                isOnTop ? (
                  <div className="w-full flex flex-col gap-4 justify-center items-center px-8">
                    <p className="text-slate-600 text-xl text-center">
                      Your score is enough to enter the top 5, please enter your
                      name to save it in the high score board !
                    </p>
                    <div className="flex gap-0 justify-center items-center">
                      <input
                        className="text-xl text-slate-600 px-4 py-1 bg-white border-solid border-2 border-slate-200 shadow-md rounded-tl-md rounded-bl-md"
                        type="text"
                        placeholder="Enter your name here"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <button
                        onClick={userSubmitInfo}
                        className="px-2 py-1 bg-amber-500 text-xl text-slate-50 rounded-tr-md rounded-br-md border-solid border-2 border-slate-200 shadow-md"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center px-8">
                    <p className="text-slate-600 text-xl text-center">
                      your score is not enough to get into top 5. Try playing
                      again
                    </p>
                  </div>
                )
              ) : (
                <div className="w-full flex justify-center items-center px-8">
                  <p className="text-sky-600 text-lg font-bold text-center">
                    You have successfully submitted the information ! let's keep
                    playing the game
                  </p>
                </div>
              )}
            </div>
          ) : boardSize === 4 ? (
            <div className="w-fit h-fit rounded-lg border-4 border-cyan-500 bg-cyan-200/80 grid grid-cols-4 gap-0.5 p-1 shadow-lg shadow-teal-500/50">
              {cardArray?.length > 0 &&
                cardArray.map((key, index) => {
                  return (
                    <div key={index + 1}>
                      <Card
                        imgIndex={key}
                        cardFlip={cardFlip}
                        cardHideList={cardToHide}
                        removeIndexFromCardToHide={removeIndexFromCardToHide}
                        isClear={resultArray?.indexOf(key) >= 0 ? true : false}
                        size={4}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            boardSize === 6 && (
              <div className="w-fit h-fit rounded-lg border-4 border-cyan-500 bg-cyan-200/80 grid sm:grid-cols-6 grid-cols-4 gap-0.5 p-1 shadow-lg shadow-teal-500/50">
                {cardArray?.length > 0 &&
                  cardArray.map((key, index) => {
                    return (
                      <div key={index + 1}>
                        <Card
                          imgIndex={key}
                          cardFlip={cardFlip}
                          cardHideList={cardToHide}
                          removeIndexFromCardToHide={removeIndexFromCardToHide}
                          isClear={
                            resultArray?.indexOf(key) >= 0 ? true : false
                          }
                          size={6}
                        />
                      </div>
                    );
                  })}
              </div>
            )
          )}
        </div>
      )}
      {alertModalContent && (
        <AnnoucementModal
          content={alertModalContent}
          closeModal={() => setAlertModalContent("")}
        />
      )}
    </React.Fragment>
  );
};

export default Board;
