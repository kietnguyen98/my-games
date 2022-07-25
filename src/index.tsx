import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MatchingLayout from "./components/Matching/Layout";
import SlidePuzzlesLayout from "./components/SlidePuzzles/Layout";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// decleare redux store
const store: Store<slidePuzzlesGameState, slidePuzzlesGameAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <App />
            </Provider>
          }
        />
        <Route path="/pepe-matching" element={<MatchingLayout />} />
        <Route path="/slide-puzzles" element={<SlidePuzzlesLayout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
