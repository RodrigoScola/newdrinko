import react, { useRef } from "react";
import "../styles/pages.css";
import { writeDoc } from "../../utils/firebase";

export const CircleComponent = ({
  user,
  waterConsumption,
  setWaterConsumption,
}) => {
  const intervalRef = useRef(null);
  const sendResultsTimeout = useRef(null);

  const sendResultsFunc = () => {
    sendResultsTimeout.current = setTimeout(() => {
      writeDoc(user.uid, {
        waterComsumption: {
          currentComsumption: waterConsumption,
        },
      });
    }, 4000);
  };
  const downWater = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setWaterConsumption((currCount) => currCount - 5);
    }, 60);
  };

  const upWater = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setWaterConsumption((currCount) => currCount + 5);
    }, 60);
  };
  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      sendResultsFunc();
    }
  };

  return (
    <div>
      <div className="box-container">
        <h2>{waterConsumption}</h2>
      </div>
      <div className="flexContainer">
        <button
          onMouseDown={() => {
            downWater();
          }}
          onMouseUp={() => {
            stopCounter();
          }}
          onMouseLeave={() => {
            stopCounter();
          }}
          className="btn btn-primary"
        >
          -
        </button>
        <button
          onMouseDown={() => {
            upWater();
          }}
          onMouseUp={() => {
            stopCounter();
          }}
          onMouseLeave={() => {
            stopCounter();
          }}
          className="btn btn-warning"
        >
          +
        </button>
      </div>
    </div>
  );
};
