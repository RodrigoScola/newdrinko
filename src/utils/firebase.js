import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  addDoc,
  collection,
  getFirestore,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyBoZHU8r-kx5e7Km4cFeVfPofadrARlh1I",
  authDomain: "drink0-dev.firebaseapp.com",
  projectId: "drink0-dev",
  storageBucket: "drink0-dev.appspot.com",
  messagingSenderId: "985581200176",
  appId: "1:985581200176:web:13e0db70296da9fa35def5",
  measurementId: "G-C917XYJBJK",
});
// writing to a document

export const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then();
  } catch (err) {
    console.log(err);
  }
};
export const firestore = getFirestore();

export const writeDoc = async (data) => {
  const res = await setDoc(doc(firestore, "userInfo", data.uid), data);
};
export const getUserInfo = async (uid) => {
  const docRef = doc(firestore, "userInfo", uid);
  const mysnapshot = await getDoc(docRef);
  if (mysnapshot.exists) {
    const docdata = await mysnapshot.data();
    return docdata;
  }
};
export const auth = app.auth();
