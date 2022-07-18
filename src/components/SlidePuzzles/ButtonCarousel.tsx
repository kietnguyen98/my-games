// import modules from library
import React, { FunctionComponent, ReactElement } from "react";
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

// import modules from local

type buttonCarouselProps = {
  listComponent: Array<ReactElement>;
};

const ButtonCarousel: FunctionComponent<buttonCarouselProps> = ({
  listComponent,
}) => {
  const prevButtonRef = React.useRef<HTMLButtonElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);

  const ButtonPrev = () => {
    return (
      <button
        onClick={() => {
          prevButtonRef?.current?.click();
        }}
        className="md:h-10 md:w-10 h-8 w-8"
      >
        <img
          src="/images/slide-puzzles/pokeball.png"
          alt="pokeball"
          className="md:h-10 md:w-10 h-8 w-8"
        />
      </button>
    );
  };

  const ButtonNext = () => {
    return (
      <button
        onClick={() => {
          nextButtonRef?.current?.click();
        }}
        className="md:h-10 md:w-10 h-8 w-8"
      >
        <img
          src="/images/slide-puzzles/pokeball.png"
          alt="pokeball"
          className="md:h-10 md:w-10 h-8 w-8"
        />
      </button>
    );
  };

  const RefPrevButton = () => {
    const swiper = useSwiper();
    return (
      <button
        ref={prevButtonRef}
        onClick={() => swiper.slidePrev()}
        className="hidden"
      ></button>
    );
  };

  const RefNextButton = () => {
    const swiper = useSwiper();
    return (
      <button
        ref={nextButtonRef}
        onClick={() => swiper.slideNext()}
        className="hidden"
      ></button>
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <ButtonPrev />
      <div className="lg:px-4 md:px-3 px-2 md:w-3/4 sm:w-4/5 w-4/5 h-fit">
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          navigation={true}
        >
          <RefPrevButton />
          <RefNextButton />
          {listComponent?.length > 0 &&
            listComponent.map((comp, index) => {
              return <SwiperSlide key={index + 1}>{comp}</SwiperSlide>;
            })}
        </Swiper>
      </div>
      <ButtonNext />
    </div>
  );
};

export default ButtonCarousel;
