import { useEffect } from 'react';
import './App.css';
import { db } from './frontend/firebase/firebase';
import {
  collection,
  getDocs
} from 'firebase/firestore';

const collectionName = 'wishlist';
const docRef = collection(db, collectionName);

function App() {

  useEffect(() => {
    (async function () {
      const data = await getDocs(docRef);
      const dataList = await data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(dataList);
    })()
  })

  return (
    <div className="App">
      Quizeazy
    </div>
  );
}

export default App;
/**
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
await addDoc(docRef, objectData);
await deleteDoc(addrDoc);

const getAddress = async () => {
    const data = await getDocs(docRef);
    const dataList = await data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    dispatch({ type: 'API_RESPONSE', payload: dataList });
};

const addNewData = async (payload) => {
    dispatch({ type: 'API_REQUEST' });
    await addDoc(docRef, payload);
    getAddress();
};

const updateData = async (id, payload) => {
    dispatch({ type: 'API_REQUEST' });
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, { ...payload });
    getAddress();
};

const deleteAddress = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    const addrDoc = doc(db, collectionName, id);
    await deleteDoc(addrDoc);
    getAddress();
};

 */