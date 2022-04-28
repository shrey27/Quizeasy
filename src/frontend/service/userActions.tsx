import { userActions } from '../store/userSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getAuth, signOut } from "firebase/auth";
import { db, userCollection } from '../firebase/firebase';
import {
    getDoc,
    doc,
    setDoc
} from 'firebase/firestore';
import { ToastMessage } from '../components';

export const signInHandler = (email: string, password: string, navigate: Function, pathname: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const resUser: any = await response?.user;
            const { accessToken, uid } = resUser;
            const docRef = doc(db, userCollection, uid);
            const docSnap = await getDoc(docRef);
            dispatch(userActions.getToken(accessToken))
            dispatch(userActions.getUser(docSnap.data()))
            dispatch(userActions.toggleLoader(false));
            localStorage.setItem("authUser", JSON.stringify(docSnap.data()));
            localStorage.setItem("authToken", JSON.stringify(accessToken));
            navigate(pathname);       
        }
        try {
            sendUserDetails();
            ToastMessage('Sign In was Successful', 'success');
        }
        catch (err) {
            console.log(err);
            dispatch(userActions.toggleLoader(false));
            ToastMessage('Sign In failed! Try Again Later', 'error');
        };
    };
}

export const signUpHandler = (username: string, email: string, password: string, navigate: Function, pathname: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const resUser: any = await response?.user;
            const { accessToken, uid } = resUser;
            const userObj = {
                uid,
                username,
                email,
                quiz: [],
                score: 0
            }
            await setDoc(doc(db, userCollection, uid), userObj);
            dispatch(userActions.getToken(accessToken))
            dispatch(userActions.getUser(userObj))
            localStorage.setItem("authUser", JSON.stringify(userObj));
            localStorage.setItem("authToken", JSON.stringify(accessToken));
            dispatch(userActions.toggleLoader(false));
            navigate(pathname);
            ToastMessage('Sign Up was Successful', 'success');
        };
        try {
            sendUserDetails();
        }
        catch (error) {
            console.log(error);
            dispatch(userActions.toggleLoader(false));
            ToastMessage('Use different credentials or Try Again Later', 'error');
        }
    };
};

export const signOutHandler = (navigate: Function, pathname: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                dispatch(userActions.getToken(''))
                dispatch(userActions.getUser({}))
                dispatch(userActions.toggleLoader(false))
                localStorage.clear();
                navigate(pathname)
            }).catch((error) => {
                console.log(error);
                dispatch(userActions.toggleLoader(false));
            });
        };
        sendUserDetails();
    };
}