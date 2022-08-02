import { userActions, userInfoObject } from "../store/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getAuth, updateEmail, updatePassword, signOut } from "firebase/auth";
import { db, userCollection } from "../firebase/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { ToastMessage } from "../components";
import { Theme } from "react-toastify";
import { AppDispatch } from "../store";

export const signInHandler = (
  email: string,
  password: string,
  navigate: Function,
  pathname: string,
  theme: Theme,
  from: String
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const resUser: any = await response?.user;
        const { accessToken, uid } = resUser;
        const docRef = doc(db, userCollection, uid);
        const docSnap = await getDoc(docRef);
        dispatch(userActions.getToken(accessToken));
        dispatch(userActions.getUser(docSnap.data()));
        dispatch(userActions.toggleLoader(false));
        localStorage.setItem("authUser", JSON.stringify(docSnap.data()));
        localStorage.setItem("authToken", JSON.stringify(accessToken));
        ToastMessage("Sign In was Successful", "success", theme);
        navigate(from ?? pathname, { replace: true });
      } catch (error: any) {
        if (error.code === "Missing or insufficient permission") {
          dispatch(userActions.toggleLoader(false));
          ToastMessage("Try again later", "error", theme);
        } else if (error.code === "auth/user-not-found") {
          dispatch(userActions.toggleLoader(false));
          ToastMessage("User not found", "error", theme);
        } else {
          console.log(error);
          dispatch(userActions.toggleLoader(false));
          ToastMessage("Sign In failed! Try Again Later", "error", theme);
        }
      }
    };
    sendUserDetails();
  };
};

export const signUpHandler = (
  username: string,
  email: string,
  password: string,
  navigate: Function,
  pathname: string,
  theme: Theme,
  from: String
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const resUser: any = await response?.user;
        const { accessToken, uid } = resUser;
        const userObj = {
          uid,
          username,
          email,
          quiz: [],
          score: 0,
        };
        await setDoc(doc(db, userCollection, uid), userObj);
        dispatch(userActions.getToken(accessToken));
        dispatch(userActions.getUser(userObj));
        localStorage.setItem("authUser", JSON.stringify(userObj));
        localStorage.setItem("authToken", JSON.stringify(accessToken));
        dispatch(userActions.toggleLoader(false));
        ToastMessage("Sign Up was Successful", "success", theme);
        navigate(from ?? pathname, { replace: true });
      } catch (error: any) {
        switch (error.code) {
          case "auth/email-already-in-use":
            dispatch(userActions.toggleLoader(false));
            ToastMessage("Email Id is already registered", "error", theme);
            break;
          case "Missing or insufficient permission":
            dispatch(userActions.toggleLoader(false));
            ToastMessage("Try again later", "error", theme);
            break;
        }
      }
    };
    sendUserDetails();
  };
};

export const updateUserhandler = (userId: string, payload: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      try {
        const userDoc = doc(db, userCollection, userId);
        await updateDoc(userDoc, payload);
        const docRef = doc(db, userCollection, userId);
        const docSnap = await getDoc(docRef);
        dispatch(userActions.getUser(docSnap.data()));
        localStorage.setItem("authUser", JSON.stringify(docSnap.data()));
        dispatch(userActions.toggleLoader(false));
      } catch (error: any) {
        console.log(error.code);
        dispatch(userActions.toggleLoader(false));
      }
    };
    sendUserDetails();
  };
};
const PAYLOAD = {
  username: "",
  email: "",
  password: "",
  newpassword: "",
};

export const updateEmailPassword = (
  userId: string,
  payload: typeof PAYLOAD,
  userInfo: typeof userInfoObject,
  navigate: Function,
  pathname: String,
  theme: Theme
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      try {
        const user: any = auth.currentUser;
        if (
          payload.username !== userInfo.username ||
          payload.email !== userInfo.email
        ) {
          const temp = {
            ...userInfo,
            email: payload.email,
            username: payload.username,
          };
          const userDoc = doc(db, userCollection, userId);
          await updateEmail(user, payload.email);
          await updateDoc(userDoc, temp);
        }
        if (payload.password !== payload.newpassword) {
          await updatePassword(user, payload.newpassword);
        }
        dispatch(userActions.toggleLoader(false));
        dispatch(signOutHandler(navigate, pathname));
        ToastMessage("Detail updated successgully", "success", theme);
      } catch (error: any) {
        console.log(error.code);
        dispatch(userActions.toggleLoader(false));
      }
    };
    sendUserDetails();
  };
};

export const getAllUsersHandler = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      try {
        const docRef = collection(db, userCollection);
        const data = await getDocs(docRef);
        const dataList = await data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const temp = dataList.map((e: any) => ({
          username: e.username,
          score: e.score,
        }));
        dispatch(userActions.getAllUsers(temp));
        dispatch(userActions.toggleLoader(false));
      } catch (error: any) {
        console.log(error.code);
        dispatch(userActions.toggleLoader(false));
      }
    };
    sendUserDetails();
  };
};

export const signOutHandler = (navigate: Function, pathname: String) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userActions.toggleLoader(true));
    const sendUserDetails = async () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          dispatch(userActions.getToken(""));
          dispatch(userActions.getUser({}));
          dispatch(userActions.toggleLoader(false));
          localStorage.clear();
          navigate(pathname);
        })
        .catch((error) => {
          console.log(error);
          dispatch(userActions.toggleLoader(false));
        });
    };
    sendUserDetails();
  };
};
