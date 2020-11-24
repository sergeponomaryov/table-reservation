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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

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

export const getTableByCell = async (userId, cell) => {
  const query = await db.collection("tables").where("cell", "==", cell).where("userId", "==", userId).get();

  if (!query.empty) {
    const snapshot = query.docs[0];
    const data = snapshot.data();
    const id = snapshot.id;
    return { id, ...data };
  } else {
    return null;
  }
};

export const updateTable = async (id, data) => {
  const doc = db.collection("tables").doc(id);
  return doc.set(data, { merge: true });
}

export const createTable = async (data) => {
  const doc = db.collection("tables").doc();
  // fetch the next table number
  const nextTableNumber = await getNextTableNumber(data.userId);
  data = {number: nextTableNumber, ...data};
  doc.set(data);
};

export const deleteTable = async (id) => {
  return db.collection("tables").doc(id).delete();
};

export const getNextTableNumber = async (userId) => {
  const query = await db
    .collection("tables")
    .where("userId", "==", userId)
    .orderBy("number", "desc").limit(1)
    .get();

  if (!query.empty) {
    const snapshot = query.docs[0];
    const data = snapshot.data();
    return data.number + 1;
  } else {
    return 1;
  }
};

export const getTableReservations = async (tableId, filter) => {
  let snapshot = db
    .collection("reservations")
    .where("tableId", "==", tableId)
    .orderBy("date", "asc");
  if(filter == "future") snapshot = snapshot.where('date', '>', new Date());
  else if(filter == "past") snapshot = snapshot.where('date', '<=', new Date());
  const resp = await snapshot.get();
  return resp.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });
};

export const saveReservation = async (id, data) => {
  const doc = id ? db.collection("reservations").doc(id) : db.collection("reservations").doc();
  return doc.set(data, { merge: true });
}

export const deleteReservation = async (id) => {
  return db.collection("reservations").doc(id).delete();
};