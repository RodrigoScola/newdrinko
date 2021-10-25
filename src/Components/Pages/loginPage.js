import React from "react";
import { signInWithGoogle, writeDoc } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";

export const LoginPage = ({ user, page, setPage }) => {
  return (
    <Background>
      <header>
        <h1>Drinko</h1>
      </header>
      <button
        className="btn btn-outline-primary"
        onClick={() =>
          signInWithGoogle().then((res) => {
            setTimeout(() => {
              setPage("main");
            }, 400);
          })
        }
      >
        Login With Google
      </button>
    </Background>
  );
};
