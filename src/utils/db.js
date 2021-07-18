import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import config from './config';

const firebaseApp = app.initializeApp(config);

// ---=== auth related ===---

export const auth = firebaseApp.auth();

export const uiConfig = () => ({
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: app.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: 'DK',
    },
    app.auth.GoogleAuthProvider.PROVIDER_ID,
    app.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
});

// ---=== https functions related ===---

const region = 'europe-west3';

export const cloudFunction = (name) =>
  firebaseApp.functions(region).httpsCallable(name);

// ---=== firestore related ===---

export const db = firebaseApp.firestore();

export const timestamp = () => app.firestore.FieldValue.serverTimestamp();

export const modifiedBy = ({ id, firstName, lastName }) => ({
  id,
  name: `${firstName} ${lastName}`,
});

export const getDocument = async (documentPath) => {
  const doc = await db.doc(documentPath).get();
  if (doc.exists) {
    return { ...doc.data(), id: doc.id };
  } else {
    return undefined;
  }
};

export const getDocumentSnapshot = (documentPath, onUpdate, onError) => {
  db.doc(documentPath).onSnapshot(
    (snapshot) =>
      snapshot.exists
        ? onUpdate({ ...snapshot.data(), id: snapshot.id })
        : onError(),
    onError
  );
};

export const saveDocument = (documentPath, document) => {
  return db.doc(documentPath).set(document);
};

export const addDocument = async (collectionPath, document) => {
  const createdId =
    collectionPath === 'mealkits'
      ? document.restaurant.name
          .concat(' ', document.name)
          .toLowerCase()
          .replace(/[^A-Z0-9]/gi, '-')
      : document.name.toLowerCase().replace(/[^A-Z0-9]/gi, '-');

  const idExists = await db.collection(collectionPath).doc(createdId).get();

  if (idExists === null || !idExists.exists) {
    return db.collection(collectionPath).doc(createdId).set(document).id;
  } else {
    return idExists.exists;
  }
};

export const updateDocument = (documentPath, snippet) => {
  return db.doc(documentPath).update(snippet);
};

export const getCollection = async (collectionPath, filters = []) => {
  const ref = db.collection(collectionPath);
  const filteredRef = filters.reduce((a, filter) => a.where(...filter), ref);
  const snapshot = await filteredRef.get();
  return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
};

export const getCollectionSnapshot = (
  collectionPath,
  filters = [],
  onUpdate,
  onError
) => {
  let ref = db.collection(collectionPath);
  ref = filters.reduce((a, filter) => a.where(...filter), ref);
  return ref.onSnapshot(
    (snapshot) =>
      onUpdate(snapshot.docs.map((d) => ({ ...d.data(), id: d.id }))),
    onError
  );
};

// ---=== populate location ===---

export const resetLocations = () => {
  const populate = cloudFunction('resetLocations');
  return populate({});
};

// ---=== storage related ===---

export const storage = firebaseApp.storage();

export const uploadFile = async (filePath, file) => {
  const storageRef = storage.ref();
  const docRef = storageRef.child(filePath);
  await docRef.put(file);
  const url = await docRef.getDownloadURL();
  return url;
};
