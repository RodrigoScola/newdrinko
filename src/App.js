import "./App.css";
import React, { useState, useEffect } from "react";
import { MainPage } from "./Components/Pages/MainPage";
import { LoginPage } from "./Components/Pages/loginPage";
import { Profile } from "./Components/Pages/Profile";
import { Feed } from "./Components/Pages/Feed";
import { Config } from "./Components/Pages/Config";
import { auth, getUserInfo } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { defaultInfo } from "./utils/user";
import { TestComponent } from "./Components/Pages/Test";

const App = () => {
  var [user] = useAuthState(auth);

  const [currentUser, setCurrentUser] = useState({});

  const [userPage, setPage] = useState("main");
  const setUserPage = (page) => {
    switch (page) {
      case "main":
        return (
          <MainPage
            setCurrentUser={setCurrentUser}
            uid={user}
            user={currentUser}
          />
        );
      case "profile":
        return <Profile user={user} />;
      case "feed":
        return <Feed />;
      case "config":
        return <Config />;
      case "test":
        return <TestComponent />;
    }
  };
  if (user) {
    user = user.multiFactor.user.uid;

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
