import React from "react";
import { signInWithGoogle, writeDoc } from "../../utils/firebase";

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
