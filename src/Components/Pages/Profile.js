import React, { useEffect } from "react";
import { Background } from "../ReusableComponent/background";
import { Navbar } from "../ReusableComponent/navBar";
import { getUserInfo } from "../../utils/firebase";
// import { getPosts } from '../../utils/firebase'

//add get posts functionality and display it on the cards

export const Profile = ({ user, userId, setCurrentUser, page, setPage }) => {
  useEffect(async () => {
    const userinformation = userId.multiFactor.user;
    const userInfo = await getUserInfo(userinformation.uid).then((res) => {
      setCurrentUser(res);
      return res;
    });
  }, []);
  // add get users post information
  if (!user) {
    return <Background />;
  }
  return (
    <Background>
      <header className="absolute-centered-container centered-container">
        {/* user image, user info */}
        <img
          style={{
            borderRadius: "55%",
          }}
          src={user.photoUrl}
          alt={user.displayName}
        />
        <h3>{user.displayName}</h3>

        <ul>
          <li>{user.userInfo.age}</li>
          <li>{user.userInfo.gender}</li>
        </ul>
        {/* sreak info */}
        <ul>
          <li>
            <h4> O melhor streak foi de: {user.streak.bestStreak}</h4>
          </li>
          <li>
            {" "}
            <h4>O streak atual e de: {user.streak.currentStreak}</h4>
          </li>
        </ul>
      </header>
      <div>{/* posts */}</div>
      {console.log(user)}
      <Navbar page={page} setPage={setPage} />
    </Background>
  );
};
