// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type loadingProps = {};
const Loading: FunctionComponent<loadingProps> = () => {
  return (
    <div className="w-full p-8 flex justify-center items-center">
      <div className="w-16 h-16 rounded-full border-solid border-[8px] border-slate-200 border-t-[8px] border-t-amber-400 border-r-yellow-400 animate-loadingSpin"></div>
    </div>
  );
};

export default Loading;
