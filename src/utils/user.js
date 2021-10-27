export const defaultInfo = (user) => {
  const date = new Date();
  const weight = 80;
  const age = 18;

  return {
    displayName: user.displayName,
    uid: user.uid,
    photoUrl: user.photoURL,
    profileInfo: {
      lastlogged: user.metadata.lastSignInTime,
      createdAt: Date.now(),
    },
    userInfo: {
      age: age,
      heightInCentimeters: 0,
      weight: weight,
      gender: "male",
    },
    streak: {
      bestStreak: 0,
      currentStreak: 0,
    },
    waterComsumption: {
      currentComsumption: 1238,
      totalComsumtion: 1239,
      lastAltered: Date.now(),
      time: {
        day: date.getDate(),
        month: date.getMonth(),
      },
    },
  };
};
export const calculateComsumption = (weight, age) => {
  const ounced = weight * 0.67 + (50 - age);
  const conversed = ounced * 29.57;
  return Math.round(conversed);
};
