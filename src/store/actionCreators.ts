import * as actionTypes from "./actionTypes";

export function updateSlidePuzzlesGame(slidePuzzlesGame: slidePuzzlesGame) {
  const action: slidePuzzlesGameAction = {
    type: actionTypes.UPDATE_SLIDE_PUZZLES_GAME,
    slidePuzzlesGame,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
