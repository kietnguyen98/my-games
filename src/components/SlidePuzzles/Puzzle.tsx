// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type puzzleProps = {
  index: number;
  imgSource: string;
  startHeight: number;
  startWidth: number;
  endHeight: number;
  endWidth: number;
  movePuzzle: any;
};

const canvasHeight: number = 100;
const canvasWidth: number = 100;

const Puzzle: FunctionComponent<puzzleProps> = ({
  index,
  imgSource,
  startHeight,
  startWidth,
  endHeight,
  endWidth,
  movePuzzle,
}) => {
  const drawImage = (imgSource: string, index: number) => {
    var theCanvas: any = document.getElementById(`canvas-${index}`);
    if (index === 15) {
      theCanvas.height = canvasHeight;
      theCanvas.width = canvasWidth;
      let ctx = theCanvas.getContext("2d");
      let img = new Image();
      img.onload = async function () {
        await ctx.drawImage(img, 10, 10, 80, 80);
      };
      img.src = "/images/slide-puzzles/pokeball.png";
    } else {
      if (theCanvas) {
        theCanvas.height = canvasHeight;
        theCanvas.width = canvasWidth;
        let ctx = theCanvas.getContext("2d");
        let img = new Image();
        img.onload = async function () {
          await ctx.drawImage(
            img,
            startWidth,
            startHeight,
            endWidth,
            endHeight,
            0,
            0,
            endWidth,
            endHeight
          );
        };
        img.src = imgSource;
      }
    }
  };

  React.useEffect(() => {
    if (imgSource && (index || index === 0)) {
      drawImage(imgSource, index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => {
        if (index !== 15) movePuzzle(index);
      }}
    >
      <canvas
        className={`bg-pink-800/80 shadow-md cursor-${
          index === 15 ? "auto" : "pointer"
        }`}
        id={`canvas-${index}`}
      ></canvas>
    </div>
  );
};

export default Puzzle;
