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
            xl:h-20
            xl:w-20
            md:h-16
            md:w-16
            w-16
            h-16
            rounded-sm cursor-pointer transition-all duration-300 ` +
            (isClear && "bg-cyan-200/80 shadow-none")
          }
        >
          {isClear ? (
            <div className="w-full h-full bg-cyan-200/80"></div>
          ) : (
            <div
              className={
                isShow ? "flip-card-inner card-flip" : "flip-card-inner"
              }
            >
              <div className="flip-card-front h-full w-full shadow-sm">
                <img
                  className="w-full h-full"
                  src="/images/matching/card-back.webp"
                  alt="pepe sad"
                />
              </div>
              <div className="flip-card-back h-full w-full shadow-sm bg-slate-50">
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
