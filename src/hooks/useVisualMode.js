import React, { useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (mode, replace = false) {
    setMode(mode);

    setHistory((prev) => {
      if (replace) {
        // return an array that has. replaces the last element of prev with mode
        return [...prev.slice(0, -1), mode];
        // [[up to the last element of prev] , mode]
      }
      return [...prev, mode];
    });
  };

  function back() {
    setHistory((prev) => [...prev.slice(0, -1)]);
    if (history.length > 1) {
      setMode(history[history.length - 2]); // Index
    } else {
      // history.length is already 1
      setMode(history[0]);
    }
  }
  return { mode, transition, back };
}

export default useVisualMode;
