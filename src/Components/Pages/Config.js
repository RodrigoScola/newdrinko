import React, { useEffect, useState } from "react";
import { Background } from "../ReusableComponent/background";
import { getUserInfo, writeDoc } from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import "../styles/pages.css";
import { Navbar } from "../ReusableComponent/navBar";
export const Config = ({ user, userId, page, setPage }) => {
  const [userData, setUserData] = useState({
    gender: "male",
    displayName: user.displayName,
    age: user.userInfo.age,
    weight: user.userInfo.weight,
    height: user.userInfo.heightInCentimeters,
  });
  const sendConfigInfo = async (e) => {
    e.preventDefault();
    writeDoc(userId.uid, {
      userInfo: {
        age: userData.age,
        gender: userData.gender,
        heightInCentimeters: userData.height,
        weight: userData.weight,
      },
    });
  };

  if (user) {
    return (
      <Background>
        <div className="absolute-centered-container" style={{ top: "30%" }}>
          <h4>Genero</h4>
          {/* gender */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              onClick={(e) => {
                setUserData({ ...userData, gender: "male" });
              }}
              class="form-check"
            >
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="male"
              />
              <label for="male">Homem</label>
            </div>
            <div
              onClick={(e) => {
                setUserData({ ...userData, gender: "femeale" });
              }}
              class="form-check"
            >
              <input type="radio" name="gender" id="femeale" />
              <label for="femeale">Mulher</label>
            </div>
            <div
              onClick={() => {
                setUserData({ ...userData, gender: "other" });
              }}
              class="form-check"
            >
              <input type="radio" name="gender" id="other" />
              <label for="other">Outro</label>
            </div>
          </div>
          <div>
            <h4>Username</h4>
            {/* name */}
            <input
              onChange={(e) => {
                setUserData({ ...userData, displayName: e.target.value });
              }}
              type="text"
              placeholder={user.displayName}
            />
          </div>
          {/* age */}
          <div>
            <h4>Idade</h4>
            <input
              onChange={(e) => {
                setUserData({
                  ...userData,
                  age: e.target.value,
                });
              }}
              type="number"
              min={13}
              max={100}
            />
          </div>
          <div>
            <h4>Peso</h4>
            <input
              type="number"
              min={0}
              max={9999}
              onChange={(e) => {
                setUserData({ ...userData, weight: e.target.value });
              }}
            />
          </div>
          <div>
            <h4>Altura (em centimetros) </h4>
            <input
              onChange={(e) => {
                setUserData({
                  ...userData,
                  height: e.target.value,
                });
              }}
              type="number"
              min={50}
            />
          </div>
          <div
            style={{
              marginTop: 12,
            }}
          >
            <button
              onClick={() => {
                auth.signOut();
              }}
              className="btn btn-danger"
            >
              Logout
            </button>
            <button
              onClick={(e) => {
                sendConfigInfo(e);
              }}
              className="btn btn-success"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </div>
        <Navbar page={page} setPage={setPage} />
      </Background>
    );
  }
  return <Background />;
};
