import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  limit,
  getDocs,
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

export const getUserPost = async (uid) => {
  let docs = [];
  const userPosts = query(
    collection(firestore, "post"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(userPosts);
  querySnapshot.forEach((item) => {
    docs.push(item.data());
    console.log(item.data());
  });
  console.log(docs);
  return docs;
};

export const writeDoc = async (uid, data) => {
  const docRef = doc(firestore, `userInfo/${uid}`);
  setDoc(docRef, data, { merge: true });
  const mysnapshot = await getDoc(docRef);
  return mysnapshot.data();
};
export const getUserInfo = async (uid) => {
  if (uid == null) {
    return uid;
  }
  const docRef = doc(firestore, "userInfo", uid);
  const mysnapshot = await getDoc(docRef);
  if (mysnapshot.exists) {
    return mysnapshot.data();
  }
};
export const newUser = async (uid, data) => {
  const docRef = doc(firestore, `userInfo/${uid}`);
  setDoc(docRef, data);
  return data;
};
export const addNewDocument = async (collectionName, data) => {
  const collectionRef = collection(firestore, collectionName);
  const newDoc = await addDoc(collectionRef, data);
  return newDoc;
};
export const queryDocuments = async (collectionName) => {
  let docs = [];
  const dataQuery = query(
    collection(firestore, collectionName),
    where("userName", "==", "Snuffy")
  );
  const querySnapshot = await getDocs(dataQuery);
  querySnapshot.forEach((item) => {
    docs.push(item.data());
  });
  return docs;
};

export const auth = app.auth();
