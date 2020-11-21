import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBlZBeow8Y8Bm3mLcrcXLkU5jpZxtqI7LA",
  authDomain: "table-management-aad9d.firebaseapp.com",
  databaseURL: "https://table-management-aad9d.firebaseio.com",
  projectId: "table-management-aad9d",
  storageBucket: "table-management-aad9d.appspot.com",
  messagingSenderId: "557114353864",
  appId: "1:557114353864:web:e3ca1d17be8845e9a6ddfd",
};

export const saveUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else if (additionalData) {
    // add new data
    try {
      await userRef.update({
        ...additionalData,
      });
    } catch (error) {
      console.error("Error updating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const getTables = async (userId) => {
  const snapshot = await db
    .collection("tables")
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });
};

export const getTableByCell = async (cell) => {
  const query = await db.collection("tables").where("cell", "==", cell).get();

  if (!query.empty) {
    const snapshot = query.docs[0];
    const data = snapshot.data();
    return data;
  } else {
    return null;
  }
};

export const updateTable = (id, data) => {
  db.collection("tables").doc(id).update(data);
};
