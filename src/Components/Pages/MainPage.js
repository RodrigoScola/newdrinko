import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { auth, newUser } from "../../utils/firebase";
import { getUserInfo } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";
import "../styles/pages.css";
import { CircleComponent } from "../ReusableComponent/CircleComponent";
import { defaultInfo } from "../../utils/user";
import { Navbar } from "../ReusableComponent/navBar";

export const MainPage = ({ user, userId, setCurrentUser, page, setPage }) => {
  const [waterConsumption, setWaterConsumption] = useState(123);
  const twentyFourHours = 86400000;
  useEffect(async () => {
    const userinformation = userId.multiFactor.user;
    const userInfo = await getUserInfo(userinformation.uid).then((res) => {
      setCurrentUser(res);
      setWaterConsumption(res.waterComsumption.currentComsumption);
      if (
        Date.now() - twentyFourHours / 2 >=
        res.waterComsumption.lastAltered
      ) {
        // calculate consumption here
      }
      return res;
    });
    // if user doesnt exist in database, then create and set the user
    if (!userInfo) {
      const userDefaultInformation = defaultInfo(userinformation);
      newUser(userinformation.uid, userDefaultInformation).then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);

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
