import React, { useEffect, useState } from "react";
import { auth, newUser, getUserInfo } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";
import "../styles/pages.css";
import { CircleComponent } from "../ReusableComponent/CircleComponent";
import { defaultInfo } from "../../utils/user";
import { Navbar } from "../ReusableComponent/navBar";
import { calculateComsumption } from "../../utils/user";

export const MainPage = ({ user, userId, setCurrentUser, page, setPage }) => {
  const [waterConsumption, setWaterConsumption] = useState(123);
  useEffect(async () => {
    // gets the user information and sets it to user
    const userinformation = userId.multiFactor.user;
    await getUserInfo(userinformation.uid)
      .then((res) => {
        setCurrentUser(res);
        const consume = calculateComsumption(
          res.userInfo.weight,
          res.userInfo.age
        );
        setWaterConsumption(res.waterComsumption.currentComsumption);
      })
      .catch(() => {
        // if user doesnt exist in database, then create and set the user
        const userDefaultInformation = defaultInfo(userinformation);
        newUser(userinformation.uid, userDefaultInformation).then((res) => {
          setCurrentUser(res);
        });
      });
  }, []);
  const twentyFourHours = 86400000;
  if (!user) {
    return <Background />;
  }
  return (
    <Background>
      <div className="container">
        <header>
          <h2> dia {user.streak.currentStreak}</h2>
        </header>
        {/* circle and stuff */}
        <div className="absolute-centered-container ">
          <CircleComponent
            user={user}
            waterConsumption={waterConsumption}
            setWaterConsumption={setWaterConsumption}
          />
        </div>
        <Navbar page={page} setPage={setPage} className="app" />
      </div>
    </Background>
  );
};
