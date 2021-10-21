export const defaultInfo = (user) => {
  return {
    displayName: user.displayName,
    uid: user.uid,
    photoUrl: user.photoURL,
    profileInfo: {
      lastlogged: user.metadata.lastSignInTime,
      createdAt: Date.now(),
    },
    userInfo: {
      age: 0,
      heightInCentimeters: 0,
      weight: 0,
      gender: "male",
    },
    streak: {
      bestStreak: 0,
      currentStreak: 0,
    },
    waterComsumption: {
      currentComsumption: 1238,
      totalComsumtion: 1239,
    },
  };
};
