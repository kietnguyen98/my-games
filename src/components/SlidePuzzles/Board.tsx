// import modules from library
import React, { FunctionComponent, ReactElement } from "react";

// import modules from local
import Clock from "../Common/Clock";
import Puzzle from "./Puzzle";
import AnnoucementModal from "../Common/AnnoucementModal";

type slidePuzzlesBoardProps = {};

const imageList = ["", "bulbasaur", "charmander", "squirtle"];
const cols: number = 4;
const rows: number = 4;
const canvasHeight: number = 100;
const canvasWidth: number = 100;

const SlidePuzzlesBoard: FunctionComponent<slidePuzzlesBoardProps> = () => {
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

    for (let i = 0; i < arrayPuzzles.length; i++) {
      var firstIndex: number = Math.floor(Math.random() * 16);
      var secondIndex: number = Math.floor(Math.random() * 16);
      swapElementsInArray(tempPuzzlesArray, firstIndex, secondIndex);
    }
    setPuzzlesArray(tempPuzzlesArray);
  };

  const renderPuzzles = (imgIndex: number) => {
    var imageSrc = `/images/slide-puzzles/${imageList[imgIndex]}.png`;
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
            endHeight={i * canvasHeight + 100}
            endWidth={j * canvasWidth + 100}
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
        setIsDone(true);
        setTimeout(() => {
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

  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="flex justify-center items-center gap-8">
          <Clock isDone={isDone} isStart={!isIntroModalOpen} />
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
    </React.Fragment>
  );
};

export default SlidePuzzlesBoard;
