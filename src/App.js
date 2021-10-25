import "./App.css";
import "./Components/styles/pages.css";
import React, { useState, useEffect } from "react";
import { MainPage } from "./Components/Pages/MainPage";
import { LoginPage } from "./Components/Pages/loginPage";
import { Profile } from "./Components/Pages/Profile";
import { Feed } from "./Components/Pages/Feed";
import { Config } from "./Components/Pages/Config";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TestComponent } from "./Components/Pages/Test";

const App = () => {
  var [userId] = useAuthState(auth);

  const [currentUser, setCurrentUser] = useState();

  const [userPage, setPage] = useState("main");
  const setUserPage = (page) => {
    switch (page) {
      case "main":
        return (
          <MainPage
            userId={userId}
            user={currentUser}
            setCurrentUser={setCurrentUser}
            page={userPage}
            setPage={setPage}
          />
        );
      case "profile":
        return (
          <Profile
            userId={userId}
            user={currentUser}
            setCurrentUser={setCurrentUser}
            page={userPage}
            setPage={setPage}
          />
        );
      case "feed":
        return <Feed page={page} user={currentUser} setPage={setPage} />;
      case "config":
        return (
          <Config
            userId={userId}
            user={currentUser}
            setCurrentUser={setCurrentUser}
            page={userPage}
            setPage={setPage}
          />
        );
      case "test":
        return <TestComponent />;
    }
  };
  if (userId) {
    return <div>{setUserPage(userPage)}</div>;
  } else {
    return (
      <LoginPage
        page={userPage}
        user={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
    );
  }
};

export default App;
