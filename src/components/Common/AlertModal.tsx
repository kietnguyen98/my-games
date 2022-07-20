// import modules from library
import React, { FunctionComponent } from "react";

// import modules from local

type alertModalProps = {
  content: string;
  closeModal: VoidFunction;
};

const AlertModal: FunctionComponent<alertModalProps> = ({
  content,
  closeModal,
}) => {
  return (
    <React.Fragment>
      {content && (
        <div className="fixed z-1 flex items-center justify-center left-0 top-0 w-full h-full overflow-auto bg-slate-900 bg-slate-900/70">
          <div className="bg-slate-50 m-auto p-4 md:w-1/4 sm:w-1/2 w-3/4 rounded-md flex flex-col items-center justify-center gap-12 animate-dropDown border-4 border-solid border-fuchsia-500 shadow-lg shadow-fuchsia-500/60">
            <p className="text-2xl text-center text-rose-600">{content}</p>
            <button
              onClick={closeModal}
              className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-400 hover:to-fuchsia-400 py-1 text-slate-50 md:text-xl text-lg text-center cursor-pointer rounded-xl transition-all duration-500 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AlertModal;
