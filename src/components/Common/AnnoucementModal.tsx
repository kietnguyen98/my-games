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
    <React.Fragment>
      {content && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/60">
          <div className="bg-slate-50 m-auto p-4 md:w-1/4 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-8 animate-dropDown border-4 border-solid border-teal-500 shadow-xl shadow-teal-500/60">
            <p className="text-2xl text-center text-green-600">{content}</p>
            <button
              onClick={closeModal}
              className="w-full bg-gradient-to-r from-gray-500 to-neutral-500 hover:from-gray-400 hover:to-neutral-400 py-1 text-slate-50 md:text-xl text-lg text-center cursor-pointer rounded-xl transition-all duration-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AnnoucementModal;
