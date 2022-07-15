// import modules from library
import React, { FunctionComponent } from "react";
// import modules from local

type customButtonProps = {
  color: string;
  clickFunction: any;
  iconUrl: string;
  text: string;
};
const CustomButton: FunctionComponent<customButtonProps> = ({
  color,
  clickFunction,
  iconUrl,
  text,
}) => {
  return (
    <button
      onClick={clickFunction}
      className={`relative w-full px-8 py-2 ${color} rounded-full shadow-lg my-2 animtaion-all duration-300 hover:animate-zoomInZoomOut flex items-center`}
    >
      <img
        className="h-8 w-8 absolute left-4"
        src={iconUrl}
        alt="button icon"
      />
      <p className="md:text-2xl text-xl text-slate-50 mr-auto ml-auto font-bold tracking-wide">
        {text}
      </p>
    </button>
  );
};

export default CustomButton;
