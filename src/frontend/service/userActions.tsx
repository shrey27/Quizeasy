import { userActions } from '../store/userSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getAuth, signOut } from "firebase/auth";

export const signInHandler = (email: string, password: string, navigate: Function, pathname: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    const resUser: any = response?.user;
                    dispatch(userActions.getToken(resUser?.accessToken))
                    dispatch(userActions.getUser({ uid: resUser.uid }))
                    dispatch(userActions.toggleLoader(false));
                    localStorage.setItem("authUser", JSON.stringify({ uid: resUser.uid }));
                    localStorage.setItem("authToken", JSON.stringify(resUser?.accessToken));
                    navigate(pathname);
                })
                .catch(err => {
                    console.log(err);
                    dispatch(userActions.toggleLoader(false));
                })
        };
        sendUserDetails();
    };
};

export const signUpHandler = (username: string, email: string, password: string, navigate: Function, pathname: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    const resUser: any = response?.user;
                    dispatch(userActions.getToken(resUser?.accessToken))
                    dispatch(userActions.getUser({ uid: resUser.uid }))
                    dispatch(userActions.toggleLoader(false));
                    localStorage.setItem("authUser", JSON.stringify({ uid: resUser.uid }));
                    localStorage.setItem("authToken", JSON.stringify(resUser?.accessToken));
                    navigate(pathname);
                })
                .catch(err => {
                    console.log(err);
                    dispatch(userActions.toggleLoader(false));
                })
        };
        sendUserDetails();
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