import React, { useRef, useState } from "react";
import "../styles/pages.css";
import { writeDoc } from "../../utils/firebase";

export const CircleComponent = ({
  user,
  waterConsumption,
  setWaterConsumption,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const twentyFourHours = 86400000;
  const intervalRef = useRef(null);
  const sendResultsTimeout = useRef(null);
  console.log(user.waterComsumption.lastAltered);
  const sendResultsFunc = () => {
    sendResultsTimeout.current = setTimeout(() => {
      if (Date.now() - twentyFourHours >= user.waterComsumption.lastAltered) {
        if (user.streak.currentStreak > user.streak.bestStreak) {
          user.streak.bestStreak = user.streak.currentStreak;
        }
      } else if (
        Date.now() - twentyFourHours / 2 >= user.waterComsumption.lastAltered &&
        waterConsumption < 10
      ) {
        user.streak.currentStreak += 1;
        // calculate that the consumption resets

        if (user.streak.currentStreak <= user.streak.bestStreak) {
          user.streak.bestStreak += 1;
        }
      }
      writeDoc(user.uid, {
        waterComsumption: {
          currentComsumption: waterConsumption,
          lastAltered: Date.now(),
        },
        streak: {
          bestStreak: user.streak.bestStreak,
          currentStreak: user.streak.currentStreak,
        },
      });
    }, 4000);
  };
  const downWater = () => {
    if (intervalRef.current || waterConsumption < 10) return;
    intervalRef.current = setInterval(() => {
      setWaterConsumption((currCount) => currCount - 6);
    }, 60);
  };

  const upWater = () => {
    if (intervalRef.current || waterConsumption < 10) return;
    intervalRef.current = setInterval(() => {
      setWaterConsumption((currCount) => currCount + 2);
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
        <h2>{waterConsumption > 10 ? waterConsumption : "hello tere"}</h2>
      </div>
      <div className="flexContainer">
        <button
          disabled={disableButtons}
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
          disabled={disableButtons}
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
