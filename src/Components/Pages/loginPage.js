import React from "react";
import { signInWithGoogle, writeDoc } from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { defaultInfo } from "../../utils/user";

export const LoginPage = ({ user, page, setPage }) => {
  return (
    <div>
      <button
        onClick={() =>
          signInWithGoogle().then((res) => {
            setTimeout(() => {
              setPage("main");
            }, 400);
          })
        }
      >
        hello ere
      </button>
    </div>
  );
};
