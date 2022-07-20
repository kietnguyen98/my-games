// import modules from library
import React, { FunctionComponent, ReactElement } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

// import modules from local
import Clock from "../Common/Clock";
import Puzzle from "./Puzzle";
import AnnoucementModal from "../Common/AnnoucementModal";
import AlertModal from "../Common/AlertModal";
import { displayPlayTime } from "../../utils/customFunctions";
import Loading from "../Common/Loading";
import apiRoutes from "../../utils/apiRoutes";

type slidePuzzlesBoardProps = {};

const SlidePuzzlesBoard: FunctionComponent<slidePuzzlesBoardProps> = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 420px)",
  });

  const imageList = ["", "bulbasaur", "charmander", "squirtle"];
  const cols: number = 4;
  const rows: number = 4;
  const canvasHeight: number = isMobile ? 75 : 100;
  const canvasWidth: number = isMobile ? 75 : 100;

  const [isDone, setIsDone] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState<number>();
  const [puzzlesArray, setPuzzlesArray] = React.useState<Array<ReactElement>>(
    []
  );
  const [movePuzzleIndex, setMovePuzzleIndex] = React.useState<number>(15);
  const [isPuzzleClick, setIsPuzzleClick] = React.useState(false);

  React.useEffect(() => {
    if (!(imgIndex || imgIndex === 0)) {
      let randomIndex: number = Math.floor(Math.random() * 3);
      setImgIndex(randomIndex + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfPuzzlesSolvable = (arrayPuzzles: Array<ReactElement>) => {
    // case 1: If the puzzle´s grid is odd the puzzle is solvable when the number of inversions is even
    // case 2: If the puzzle´s grid is even and the empty tile is in an odd row counting from the bottom, the puzzle is solvable if the number of inversions is even.
    // case 3: If the puzzle´s grid is even and the empty tile is in an even row counting from the bottom, the puzzle is solvable if the number of inversions is odd.

    var inversionsNumber: number = 0;

    for (let i = 0; i < arrayPuzzles.length; i++) {
      if (arrayPuzzles[i].props.index === 15) {
        continue;
      }
      for (let j = i + 1; j < arrayPuzzles.length; j++) {
        if (arrayPuzzles[i].props.index > arrayPuzzles[j].props.index) {
          inversionsNumber = inversionsNumber + 1;
        }
      }
    }
    // we have 4x4 puzzles so the puzzle's grid is even and the empty tile is 1: odd row counting from the bottom. => case 2
    if (inversionsNumber % 2 === 0) {
      return true;
    } else {
      return false;
    }
  };

  const swapElementsInArray = (
    array: Array<ReactElement>,
    firstIndex: number,
    secondIndex: number
  ) => {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  };

  const shuffleArrayPuzzles = (arrayPuzzles: Array<ReactElement>) => {
    let tempPuzzlesArray: Array<ReactElement> = arrayPuzzles;
    // using fisher-yates algorithm here
    for (let i = arrayPuzzles.length - 2; i > 0; i--) {
      let firstIndex: number = i;
      let secondIndex: number = Math.floor(Math.random() * (i + 1));
      swapElementsInArray(tempPuzzlesArray, firstIndex, secondIndex);
    }
    while (!checkIfPuzzlesSolvable(tempPuzzlesArray)) {
      for (let i = arrayPuzzles.length - 2; i > 0; i--) {
        let firstIndex: number = i;
        let secondIndex: number = Math.floor(Math.random() * (i + 1));
        swapElementsInArray(tempPuzzlesArray, firstIndex, secondIndex);
      }
    }
    setPuzzlesArray(tempPuzzlesArray);
  };

  const renderPuzzles = (imgIndex: number) => {
    var imageSrc = `/images/slide-puzzles/${imageList[imgIndex]}${
      isMobile ? "-mobile" : ""
    }.png`;
    var index = 0;
    var tempPuzzlesArray: Array<ReactElement> = [];
    setPuzzlesArray([]);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        tempPuzzlesArray.push(
          <Puzzle
            movePuzzle={movePuzzle}
            key={index}
            index={index}
            imgSource={imageSrc}
            startHeight={i * canvasHeight}
            startWidth={j * canvasWidth}
            endHeight={i * canvasHeight + canvasHeight}
            endWidth={j * canvasWidth + canvasWidth}
          />
        );
        index++;
      }
    }
    setPuzzlesArray(tempPuzzlesArray);
    shuffleArrayPuzzles(tempPuzzlesArray);
  };

  React.useEffect(() => {
    if (imgIndex || imgIndex === 0) {
      renderPuzzles(imgIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIndex]);

  const findArrayIndexByPuzzleIndex = (
    puzzlesArray: Array<ReactElement>,
    currentIndex: number
  ) => {
    var currentPuzzleArray = puzzlesArray.filter(
      (puzzle) => puzzle.props.index === currentIndex
    );
    return puzzlesArray.indexOf(currentPuzzleArray[0]);
  };

  const checkIsNeighbor = (
    puzzleIndexInArray: number,
    blankIndexInArray: number
  ) => {
    var puzzleXY = {
      x: 0,
      y: 0,
    };
    var blankXY = {
      x: 0,
      y: 0,
    };
    var index: number = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (index === puzzleIndexInArray) {
          puzzleXY = {
            x: j,
            y: i,
          };
        }
        if (index === blankIndexInArray) {
          blankXY = {
            x: j,
            y: i,
          };
        }
        index++;
      }
    }
    if (
      (puzzleXY.x === blankXY.x && Math.abs(puzzleXY.y - blankXY.y) === 1) ||
      (puzzleXY.y === blankXY.y && Math.abs(puzzleXY.x - blankXY.x) === 1)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const movePuzzle = (index: number) => {
    setMovePuzzleIndex(index);
    setIsPuzzleClick((prevState) => !prevState);
  };

  const swap2Puzzles = (
    puzzlesArray: Array<ReactElement>,
    firstIndex: number,
    secondIndex: number
  ) => {
    var tempPuzzlesArray = [...puzzlesArray];
    var tempPuzzle: ReactElement = tempPuzzlesArray[firstIndex];
    tempPuzzlesArray[firstIndex] = tempPuzzlesArray[secondIndex];
    tempPuzzlesArray[secondIndex] = tempPuzzle;

    setPuzzlesArray(tempPuzzlesArray);
  };

  React.useEffect(() => {
    if (movePuzzleIndex !== 15) {
      const puzzleIndexInArray = findArrayIndexByPuzzleIndex(
        puzzlesArray,
        movePuzzleIndex
      );
      const blankIndexInArray = findArrayIndexByPuzzleIndex(puzzlesArray, 15);
      if (checkIsNeighbor(puzzleIndexInArray, blankIndexInArray)) {
        // swap current puzzle with blank
        swap2Puzzles(puzzlesArray, puzzleIndexInArray, blankIndexInArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movePuzzleIndex, isPuzzleClick]);

  // checking if user finished the game

  React.useEffect(() => {
    if (puzzlesArray.length === 16) {
      let isFinished: boolean = true;
      for (let i = 0; i < puzzlesArray.length - 1; i++) {
        if (!(puzzlesArray[i].props.index < puzzlesArray[i + 1].props.index)) {
          isFinished = false;
        }
      }
      if (isFinished) {
        setTimeout(() => {
          setIsDone(true);
          setAnnoucementContent(
            "congratulations !, you have finished the game !"
          );
        }, 500);
      }
    }
  }, [puzzlesArray]);

  const [isRefModalOpen, setIsRefModalOpen] = React.useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = React.useState(true);
  const [annoucementContent, setAnnoucementContent] = React.useState("");
  const [timeString, setTimeString] = React.useState("00:00:00");
  const updateTimeString = (value: string) => {
    setTimeString(value);
  };

  // user submit to highscore board
  const [userName, setUserName] = React.useState("");
  const [userSubmitSuccessfully, setUserSubmitSuccessfully] =
    React.useState(false);
  const [alertModalContent, setAlertModalContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOnTop, setIsOnTop] = React.useState(false);

  const userSubmitInfo = () => {
    if (!userName) {
      return setAlertModalContent("You haven't enter your name yet ");
    } else {
      const createNewUser = async (userName: string) => {
        setIsLoading(true);
        const highScoreResult = await axios.get(
          process.env.REACT_APP_DEPLOY_API_ENDPOINT +
            apiRoutes.GET_ALL_SLIDE_PUZZLES_HIGH_SCORE
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
          process.env.REACT_APP_DEPLOY_API_ENDPOINT +
            apiRoutes.ADD_SLIDE_PUZZLES_HIGH_SCORE,
          {
            userName: userName,
            playTime: timeString,
          }
        );
        if (result?.status === 200) {
          setUserName("");
          setUserSubmitSuccessfully(true);
          setIsLoading(false);
          return setAnnoucementContent("Submit information successfully !");
        } else {
          setUserName("");
          setIsLoading(false);
          return setAlertModalContent("An error occurred, please try again !");
        }
      };

      createNewUser(userName);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    const getListHighScore = async () => {
      const result = await axios.get(
        process.env.REACT_APP_DEPLOY_API_ENDPOINT +
          apiRoutes.GET_ALL_MATCHING_HIGH_SCORE
      );

      const listHighScore = result?.data;
      if (listHighScore.length === 5) {
        for (let i = 0; i < listHighScore.length; i++) {
          if (timeString.localeCompare(listHighScore[i].playTime) < 0) {
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

    getListHighScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : isDone ? (
        <div className="w-5/6">
          <div className="flex flex-col gap-8 justify-center items-center">
            <p className="text-green-600 text-3xl text-center font-bold">
              Congratulations !!!, you have finished the game
            </p>
            <div className="w-full flex justify-center items-center">
              <img
                src="/images/slide-puzzles/pokemon-congratulations.gif"
                alt="pokemon congratulations"
              />
            </div>
            <p className="text-sky-600 text-3xl text-center font-bold">
              Your play time is: {displayPlayTime(timeString)}
            </p>
            {!userSubmitSuccessfully ? (
              isOnTop ? (
                <div className="w-full flex flex-col gap-8 justify-center items-center px-8">
                  <p className="text-slate-600 text-2xl text-center">
                    Your score is enough to enter the top 5, please enter your
                    name to save it in the high score board !
                  </p>
                  <div className="flex gap-0 justify-center items-center">
                    <input
                      className="text-2xl text-slate-600 px-4 py-1 bg-white border-solid border-2 border-slate-200 shadow-md rounded-tl-md rounded-bl-md"
                      type="text"
                      placeholder="Enter your name here"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <button
                      onClick={userSubmitInfo}
                      className="px-4 py-1.5 h-full bg-amber-500 text-xl text-slate-50 rounded-tr-md rounded-br-md border-solid border-2 border-slate-200 shadow-md"
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
                <p className="text-slate-600 text-2xl text-center">
                  You have successfully submitted the information ! let's keep
                  playing the game
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <p className="text-slate-600 text-2xl text-center font-bold">
            Playing Slide Puzzles Game...
          </p>
          <div className="flex sm:flex-row flex-col justify-center items-center sm:gap-8 gap-6">
            <Clock
              isDone={isDone}
              isStart={!isIntroModalOpen}
              getTimeString={updateTimeString}
            />
            <button
              onClick={() => setIsRefModalOpen(true)}
              className="px-8 py-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-slate-50 text-xl text-center cursor-pointer rounded-lg transition-all duration-500 shadow-md hover:shadow-lg"
            >
              See Reference
            </button>
          </div>
          <div className="h-fit w-fit border-4 border-solid border-fuchsia-500/50 ring-2 ring-violet-500/50 ring-offset-4 ring-offset-fuchsia-100/50 rounded-lg shadow-xl shadow-fuchsia-500/50 bg-slate-200">
            <div className="w-fit h-fit grid grid-cols-4 gap-0.5 bg-slate-900/80">
              {puzzlesArray?.length > 0 &&
                puzzlesArray.map((puzzle, index) => puzzle)}
            </div>
          </div>
        </div>
      )}

      {isRefModalOpen && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/70">
          <div className="bg-slate-50 m-auto p-4 shadow-xl xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown">
            {imgIndex && (
              <img
                src={`/images/slide-puzzles/${imageList[imgIndex]}.png`}
                alt="reference"
              />
            )}
            <button
              onClick={() => setIsRefModalOpen(false)}
              className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 text-2xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isIntroModalOpen && imgIndex && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/70">
          <div className="bg-slate-50 m-auto p-4 shadow-xl xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown">
            <p className="md:text-2xl text-xl text-slate-600 font-bold text-center">
              your challenge is{" "}
              <span className="font-bold uppercase">
                {imageList[imgIndex]} !
              </span>
            </p>
            {imgIndex && (
              <img
                src={`/images/slide-puzzles/${imageList[imgIndex]}.png`}
                alt="reference"
              />
            )}
            <button
              onClick={() => setIsIntroModalOpen(false)}
              className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 py-1 text-slate-50 text-2xl text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Let's play
            </button>
          </div>
        </div>
      )}
      <AnnoucementModal
        content={annoucementContent}
        closeModal={() => setAnnoucementContent("")}
      />
      <AlertModal
        content={alertModalContent}
        closeModal={() => setAlertModalContent("")}
      />
    </React.Fragment>
  );
};

export default SlidePuzzlesBoard;
