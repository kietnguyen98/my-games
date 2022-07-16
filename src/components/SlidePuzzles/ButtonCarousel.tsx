// import modules from library
import React, { FunctionComponent } from "react";
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

// import modules from local
import CustomButton from "../Common/CustomButton";
import { useNavigate } from "react-router-dom";

type buttonCarouselProps = {};

const ButtonCarousel: FunctionComponent<buttonCarouselProps> = () => {
  const navigate = useNavigate();
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
          navigation
        >
          <RefPrevButton />
          <RefNextButton />
          <SwiperSlide>
            {" "}
            <CustomButton
              color="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500"
              clickFunction={() => alert("cc")}
              iconUrl="/images/slide-puzzles/pikachu-icon.png"
              text="start the game"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CustomButton
              color="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500"
              clickFunction={() => alert("cc")}
              iconUrl="/images/slide-puzzles/pikachu-icon.png"
              text="see leader board"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CustomButton
              color="bg-gradient-to-r from-zinc-500 via-neutral-500 to-stone-500"
              clickFunction={() => navigate("/")}
              iconUrl="/images/slide-puzzles/pikachu-icon.png"
              text="back to menu"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <ButtonNext />
    </div>
  );
};

export default ButtonCarousel;
