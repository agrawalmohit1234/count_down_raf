import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [updateTime, setUpdateTime] = useState(time);

  let startTime;
  function startAnimation(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }
    const elapsedTime = timestamp - startTime;
    const remainingTime = Math.max(0, updateTime * 1000 - elapsedTime);
    const seconds = Math.ceil(remainingTime / 1000);
    let [m, s] = convertToMinuteSec(seconds);
    setMinute(m);
    setSecond(s);
    setUpdateTime((t) => seconds);
    if (remainingTime > 0) {
      requestAnimationFrame(startAnimation);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(startAnimation);
    }, 0);
  }, [startAnimation]);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleCountDown = () => {
    setUpdateTime(time);
  };

  const convertToMinuteSec = (t) => {
    return [Math.floor(t / 60), t % 60];
  };

  return (
    <div className="container">
      <div className="inputData">
        <input
          type="number"
          value={time}
          onChange={handleChange}
          placeholder="Seconds...."
        />
        <button onClick={handleCountDown}>Start Count Down</button>
        {(second > 0 || minute > 0) && (
          <div className="countdown">
            <div>
              {`${String(minute).padStart(2, "0")} : ${String(second).padStart(
                2,
                "0"
              )}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
