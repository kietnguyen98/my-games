/* eslint-disable jsx-a11y/img-redundant-alt */
// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type cardProps = {
  imgIndex: number;
  cardFlip: any;
  cardHideList: Array<number>;
  removeIndexFromCardToHide: any;
  isClear: boolean;
  size: number;
};

const Card: FunctionComponent<cardProps> = ({
  imgIndex,
  cardFlip,
  cardHideList,
  removeIndexFromCardToHide,
  isClear,
  size,
}) => {
  const [isShow, setIsShow] = React.useState(false);

  const flipCard = (cardIndex: number) => {
    setIsShow(true);
    if (!isShow) {
      cardFlip(cardIndex);
    }
  };

  React.useEffect(() => {
    if (
      cardHideList.length === 2 &&
      cardHideList.indexOf(imgIndex) >= 0 &&
      isShow
    ) {
      setTimeout(() => {
        setIsShow(false);
        removeIndexFromCardToHide(imgIndex);
      }, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardHideList]);

  return (
    <React.Fragment>
      {imgIndex && (
        <div
          onClick={() => flipCard(imgIndex)}
          className={
            `flip-card bg-transparent 
            xl:h-${size === 6 ? "20" : "24"} 
            xl:w-${size === 6 ? "20" : "24"} 
            md:h-${size === 6 ? "16" : "20"} 
            md:w-${size === 6 ? "16" : "20"} 
            w-${size === 6 ? "16" : "16"} 
            h-${size === 6 ? "16" : "16"} 
            rounded-sm cursor-pointer transition-all duration-300 ` +
            (isClear && "bg-teal-100/80 shadow-none")
          }
        >
          {isClear ? (
            <div className="w-full h-full bg-teal-100/80"></div>
          ) : (
            <div
              className={
                isShow ? "flip-card-inner card-flip" : "flip-card-inner"
              }
            >
              <div className="flip-card-front h-full w-full shadow-sm bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 p-4">
                <img
                  className="w-full h-full"
                  src="/images/matching/pepe-sad-white.png"
                  alt="pepe sad"
                />
              </div>
              <div className="flip-card-back h-full w-full shadow-sm">
                <img
                  className="w-full h-full"
                  src={`images/matching/${imgIndex}.png`}
                  alt={`pepe-image-${imgIndex}`}
                ></img>
              </div>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Card;
