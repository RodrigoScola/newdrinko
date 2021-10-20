import React from "react";
import { useEffect } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../utils/firebase";
import { writeDoc, getUserInfo } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";

export const MainPage = ({ uid, user, setCurrentUser }) => {
  useEffect(() => {
    getUserInfo(uid).then((res) => {
      setCurrentUser(res);
    });
  }, []);
  return (
    <div>
      <Background>
        <header></header>
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          logout
        </button>
      </Background>
    </div>
  );
};
