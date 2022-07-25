import * as actionTypes from "./actionTypes";

const initialStates: slidePuzzlesGameState = {
  slidePuzzlesGame: {
    isPlaying: false,
  },
};

const reducer = (
  state: slidePuzzlesGameState = initialStates,
  action: slidePuzzlesGameAction
): slidePuzzlesGameState => {
  switch (action.type) {
    case actionTypes.UPDATE_SLIDE_PUZZLES_GAME:
      const newSlidePuzzleGame: slidePuzzlesGame = {
        isPlaying: false,
      };
      return {
        ...state,
        slidePuzzlesGame: newSlidePuzzleGame,
      };
    default:
      return state;
  }
};

export default reducer;
