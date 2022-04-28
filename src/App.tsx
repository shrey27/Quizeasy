import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from './frontend/components';
import { availableRoutes } from './frontend/routes';
import { useTheme } from './frontend/context';
import { userActions } from './frontend/store/userSlice';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageAuth = localStorage.getItem("authToken");
    if (localStorageAuth) {
      dispatch(userActions.getToken(localStorageAuth));
      const localStorageUser = localStorage.getItem("authUser");
      dispatch(userActions.getUser(localStorageUser ? JSON.parse(localStorageUser) : null));
    }
  }, [dispatch])

  return (
    <div className="App" app-theme={theme}>
      <Navbar />
      {availableRoutes}
    </div>
  );
}

export default App;

/**
import { db } from './frontend/firebase/firebase';
const collectionName = 'quizCollection';
const docRef = collection(db, collectionName);
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
await addDoc(docRef, objectData);
await deleteDoc(addrDoc);

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


  (async function () {
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
  })()

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