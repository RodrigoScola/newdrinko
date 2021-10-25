import react, { useEffect, useState } from "react";
import { Background } from "../ReusableComponent/background";
import { getUserInfo } from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import "../styles/pages.css";
import { Navbar } from "../ReusableComponent/navBar";
export const Config = ({ user, userId, setCurrentUser, page, setPage }) => {
  const [userData, setUserData] = useState({
    gender: "male",
    username: user.displayName,
    age: user.userInfo.age,
  });
  console.log(user);
  const sendConfigInfo = async (e) => {
    e.preventDefault();
  };

  if (user) {
    return (
      <Background>
        <div className="absolute-centered-container">
          <form
            onSubmit={(e) => {
              sendConfigInfo(e);
            }}
          >
            <h4>Genero</h4>
            {/* gender */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div>
                <input
                  type="radio"
                  id="male"
                  name="male"
                  value="male"
                  checked
                />
                <label for="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="femeale"
                  name="femeale"
                  value="femeale"
                />
                <label for="male">Femeale</label>
              </div>
              <div>
                <input type="radio" id="other" name="other" value="other" />
                <label for="other">Other</label>
              </div>
            </div>
            <div>
              <h4>Username</h4>
              {/* name */}
              <input type="text" placeholder={user.displayName} />
            </div>
            {/* age */}
            <div>
              <h4>Idade</h4>
              <input type="number" min={13} max={100} />
            </div>
            <div>
              <button
                onClick={() => {
                  auth.signOut();
                }}
                className="btn btn-danger"
              >
                Logout
              </button>
              <button className="btn btn-success" type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>
        <Navbar page={page} setPage={setPage} />
      </Background>
    );
  }
  return <Background />;
};
