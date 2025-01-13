import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        const idToken = await result.user.getIdToken();
        const { displayName, email, photoURL, phoneNumber, uid } = result.user;
        return {
            ok: true,
            isNewUser,
            displayName,
            email,
            photoURL,
            phoneNumber,
            uid,
            idToken,
        };
    } catch (error: any) {
        const errorMessage = error.message;
        console.log(error);

        return { ok: false, errorMessage };
    }
};

export const registerUserWithGoogle = async (userInfo: UserCredential) => {
    try {
    } catch (error: any) {
        const errorMessage = error.message;
        console.log(error);

        return { ok: false, errorMessage };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
