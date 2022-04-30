import './App.css';
import { useEffect } from 'react';
import { Navbar } from './frontend/components';
import { availableRoutes } from './frontend/routes';
import { useTheme } from './frontend/context';
import { userActions } from './frontend/store/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsersHandler } from './frontend/service/userActions';
import { useAppDispatch } from './frontend/utility';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageAuth = localStorage.getItem("authToken");
    if (localStorageAuth) {
      dispatch(userActions.getToken(localStorageAuth));
      const localStorageUser = localStorage.getItem("authUser");
      dispatch(userActions.getUser(localStorageUser ? JSON.parse(localStorageUser) : null));
    }
    dispatch(getAllUsersHandler());
  }, [dispatch])

  return (
    <div className="App" app-theme={theme}>
      <Navbar />
      {availableRoutes}
      <ToastContainer style={{ fontWeight: '500', fontSize: '1.15rem' }} />
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