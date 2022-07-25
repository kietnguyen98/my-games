interface slidePuzzlesGame {
  isPlaying: boolean;
}

type slidePuzzlesGameState = {
  slidePuzzlesGame: slidePuzzlesGame;
};

type slidePuzzlesGameAction = {
  type: string;
  slidePuzzlesGame: slidePuzzlesGame;
};

type DispatchType = (args: slidePuzzlesGameActions) => slidePuzzlesGameActions;
