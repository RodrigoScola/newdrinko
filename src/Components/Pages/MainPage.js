import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore, newUser } from "../../utils/firebase";
import { writeDoc, getUserInfo } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";
import "../styles/pages.css";
import { CircleComponent } from "../ReusableComponent/CircleComponent";
import { defaultInfo } from "../../utils/user";
import { Navbar } from "../ReusableComponent/navBar";

export const MainPage = ({ user, userId, setCurrentUser }) => {
  useEffect(async () => {
    const userinformation = userId.multiFactor.user;
    const userInfo = await getUserInfo(userinformation.uid).then((res) => {
      setCurrentUser(res);
      return res;
    });
    // if user doesnt exist in database, then create and set the user
    if (!userInfo) {
      const userDefaultInformation = defaultInfo(userinformation);
      newUser(userinformation.uid, userDefaultInformation).then((res) => {
        setCurrentUser(res);
      });
    }
    // add the write doc/set doc functionality where it alters the users stuff
  }, []);

  // const [waterConsumption, setWaterConsumption] = useState(user.waterConsumption);
  const [waterConsumption, setWaterConsumption] = useState(
    user.waterComsumption.currentComsumption
  );
  if (!user) {
    return <Background />;
  }
  return (
    <Background>
      <button onClick={() => auth.signOut()}>asdf</button>
      <div className="container">
        <header>
          {console.log(user)}
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
        <Navbar />
      </div>
    </Background>
  );
};
