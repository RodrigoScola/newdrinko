export const defaultInfo = (user) => {
  return {
    displayName: user.displayName,
    uid: user.uid,
    photoUrl: user.photoURL,
    profileInfo: {
      lastlogged: user.metadata.lastSignInTime,
    },
    userInfo: {
      age: 0,
    },
    streak: {
      bestStreak: 0,
      currentStreak: 0,
    },
  };
};
