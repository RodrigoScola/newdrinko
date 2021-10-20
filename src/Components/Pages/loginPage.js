import React from "react";
import { signInWithGoogle } from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";

export const LoginPage = ({ user, page, setPage }) => {
  return (
    <div>
      <button
        onClick={() =>
          signInWithGoogle().then(
            setTimeout(() => {
              setPage("feed");
            }, 400)
          )
        }
      >
        hello ere
      </button>
    </div>
  );
};
