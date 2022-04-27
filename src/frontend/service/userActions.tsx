import { userActions } from '../store/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const signInHandler = (email: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(userActions.toggleLoader(true));
        const sendUserDetails = async () => {
            signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    const resUser: any = response?.user;
                    dispatch(userActions.getToken(resUser?.accessToken))
                    dispatch(userActions.getUser({ uid: resUser.uid }))
                    dispatch(userActions.toggleLoader(false));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(userActions.toggleLoader(false));
                })
        };
        sendUserDetails();
    };
};