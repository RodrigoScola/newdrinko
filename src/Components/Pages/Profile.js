import React, { useEffect, useState } from "react";
import { Background } from "../ReusableComponent/background";
import { Navbar } from "../ReusableComponent/navBar";
import { getUserInfo } from "../../utils/firebase";
// import { getPosts } from '../../utils/firebase'
import { firestore } from "../../utils/firebase";
import { getUserPost } from "../../utils/firebase";
import { Post } from "../ReusableComponent/Post";
export const Profile = ({ user, userId, setCurrentUser, page, setPage }) => {
  const [post, setPost] = useState();
  useEffect(async () => {
    const userinformation = userId.multiFactor.user;
    getUserPost(user.uid).then((res) => {
      console.log(res);
      setPost(res);
    });
    const userInfo = await getUserInfo(userinformation.uid).then((res) => {
      setCurrentUser(res);
      return res;
    });
  }, []);
  // add get users post information
  if (!post) {
    return <Background />;
  }
  const length = post.length || 123;
  const height = `${length * 122 * 2}px`;
  return (
    <div style={{ height: height, backgroundColor: "#3d3fac" }}>
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
        <div
          style={{
            marginTop: "320px",
          }}
          className="centered-container"
        >
          {/* posts */}
          {post.map((value, idx) => {
            return <Post user={value} key={idx} />;
          })}
        </div>
        <Navbar page={page} setPage={setPage} />
      </Background>
    </div>
  );
};
