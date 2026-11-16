import { useState, useEffect } from 'react';

export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleReset = () => {
    setSeconds(0);
  };

  return (
    <div className="timer-box">
      <span>
        Chronomètre automatique : <strong>{seconds}s</strong>
      </span>
      <div className="btn-group">
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-toggle"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Reprendre'}
        </button>
      </div>
    </div>
  );
}
