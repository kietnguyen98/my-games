// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type annoucementModalProps = {
  content: string;
  closeModal: any;
};

const AnnoucementModal: FunctionComponent<annoucementModalProps> = ({
  content,
  closeModal,
}) => {
  return (
    <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/60">
      <div className="bg-slate-50 m-auto p-4 shadow-xl md:w-1/4 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-4 animate-dropDown">
        <p className="text-lg font-bold text-center text-rose-600">Alert !</p>
        <p className="text-md text-center text-slate-600">{content}</p>
        <button
          onClick={closeModal}
          className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 text-md text-center cursor-pointer rounded-xl transition-all duration-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnnoucementModal;
