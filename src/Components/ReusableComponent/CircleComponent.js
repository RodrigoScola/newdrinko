import React, { useEffect, useRef } from "react";
import "../styles/pages.css";
import { writeDoc } from "../../utils/firebase";
import { calculateComsumption } from "../../utils/user";

const ConsumeComponent = (props) => {
  return (
    <div
      style={{
        fontSize: ".5em",
        marginTop: 12,
      }}
    >
      <p>{props.message}</p>
    </div>
  );
};

export const CircleComponent = ({
  user,
  waterConsumption,
  setWaterConsumption,
}) => {
  const twentyFourHours = 86400000;
  const intervalRef = useRef(null);
  const sendResultsTimeout = useRef(null);

  const twentyFourHoursPassed = (num = 1) => {
    if (
      Date.now() - twentyFourHours / num >=
      user.waterComsumption.lastAltered
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (twentyFourHoursPassed(2)) {
      setWaterConsumption(
        calculateComsumption(user.userInfo.weight, user.userInfo.age)
      );
    }
  }, []);

  const sendResultsFunc = () => {
    sendResultsTimeout.current = setTimeout(() => {
      // checks if been over 24 hours since last change
      if (twentyFourHoursPassed()) {
        if (user.streak.currentStreak >= user.streak.bestStreak) {
          user.streak.bestStreak = user.streak.currentStreak;
        }
        user.streak.currentStreak = 0;
      }
      // checks if 12 hours since last change
      if (!twentyFourHoursPassed(2) && waterConsumption <= 10) {
        user.streak.currentStreak++;
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
    }, 2000);
  };
  const downWater = () => {
    if (intervalRef.current || waterConsumption < 10) return;
    intervalRef.current = setInterval(() => {
      setWaterConsumption((currCount) => currCount - 8);
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
        <h2>
          {waterConsumption > 10 ? (
            waterConsumption
          ) : (
            <ConsumeComponent message={"Consumo diario atingido"} />
          )}
        </h2>
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
