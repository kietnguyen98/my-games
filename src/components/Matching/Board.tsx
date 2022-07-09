// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local
import Card from "./Card";

type boardProps = {
  gameEnd: any;
};

const Board: FunctionComponent<boardProps> = ({ gameEnd }) => {
  const [boardSize, setBoardSize] = React.useState(
    window.localStorage.getItem("level") === "4x4" ? 4 : 6
  );

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

  //   const [seconds, setSeconds] = React.useState(0)

  const [timerString, setTimerString] = React.useState<string>("00:00:00");

  React.useEffect(() => {
    var second = 0;
    const getTimeString = (time: number) => {
      let valString: string = time.toString();
      if (valString.length < 2) {
        valString = "0" + valString;
      }
      return valString;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps

    let interval = window.setInterval(() => {
      second = second + 1;
      let secondsString = getTimeString(second % 60);
      let minutesString = getTimeString(Math.floor(second / 60));
      let hoursString = getTimeString(Math.floor(second / 3600));
      setTimerString(hoursString + ":" + minutesString + ":" + secondsString);
    }, 1000);

    if (isDone) {
      window.clearInterval(interval);
    }

    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  const displayPlaytime = (timeString: string) => {
    var seconds = timeString.substring(6, 8);
    var minutes = timeString.substring(3, 5);
    var hours = timeString.substring(0, 2);
    var secondsStr: string = "";
    var minutesStr: string = "";
    var hoursStr: string = "";
    if (parseInt(seconds) > 0) secondsStr = seconds + "(s)";
    if (parseInt(minutes) > 0) minutesStr = minutes + "(m) ";
    if (parseInt(hours) > 0) hoursStr = hours + "(h) ";

    return hoursStr + minutesStr + secondsStr;
  };

  return (
    <div className="w-full flex flex-col md:gap-1 gap-2 items-center justify-center">
      {!isDone && (
        <React.Fragment>
          <div className="flex justify-center items-center gap-2">
            <img
              className="h-6 w-6"
              src="images/matching/timer.png"
              alt="timer"
            ></img>
            <div className="px-2 py-0 border-2 border-solid border-slate-600 rounded-lg bg-sky-200">
              <p className="text-sm text-bold text-slate-600 tracking-wider">
                {timerString}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-md text-center text-slate-600">
              Your Point:{" "}
              <span className="font-bold">
                {userPoint} / {Math.pow(boardSize, 2) / 2}
              </span>
            </p>
          </div>
        </React.Fragment>
      )}
      {isDone ? (
        <div className="w-full flex justify-center flex-col items-center gap-8 sm:px-0 px-4">
          <p className="text-2xl text-cyan-500 text-center font-bold uppercase">
            Congratulations !, you have finished the game
          </p>
          <div className="w-full flex justify-center">
            <img
              className="sm:h-32 sm:w-32 w-24 h-24"
              src="/images/matching/pepe-congratulation.gif"
              alt="pepe congrate"
            />
            <img
              className="sm:h-32 sm:w-32 w-24 h-24"
              src="/images/matching/pepe-congratulation.gif"
              alt="pepe congrate"
            />
            <img
              className="sm:h-32 sm:w-32 w-24 h-24"
              src="/images/matching/pepe-congratulation.gif"
              alt="pepe congrate"
            />
          </div>
          <p className="text-xl text-cyan-700 text-center">
            your playtime is {displayPlaytime(timerString)}
          </p>
        </div>
      ) : boardSize === 4 ? (
        <div className="w-full h-full rounded-lg border-2 border-indigo-500/80 bg-indigo-100/80 grid grid-cols-4 gap-1 p-1">
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
          <div className="w-full h-full rounded-lg border-2 border-indigo-500/80 bg-indigo-100/80 grid sm:grid-cols-6 grid-cols-4 gap-1 p-1">
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
                      size={6}
                    />
                  </div>
                );
              })}
          </div>
        )
      )}
    </div>
  );
};

export default Board;
