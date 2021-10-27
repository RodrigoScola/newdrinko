import React from "react";
import { signInWithGoogle } from "../../utils/firebase";
import { Background } from "../ReusableComponent/background";
import "../styles/pages.css";

export const LoginPage = ({ setPage }) => {
  return (
    <Background>
      <div
        style={{
          marginTop: "40px",

          textAlign: "center",
        }}
        className="container"
      >
        <header>
          <h1
            style={{
              fontSize: "10em",
            }}
          >
            Drinko
          </h1>
        </header>
        <button
          className="btn btn-success"
          onClick={() =>
            signInWithGoogle().then(() => {
              setTimeout(() => {
                setPage("main");
              }, 400);
            })
          }
        >
          Login With Google
        </button>
      </div>
    </Background>
  );
};
