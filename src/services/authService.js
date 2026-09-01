import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "@react-native-firebase/auth";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    serverTimestamp,
} from '@react-native-firebase/firestore';

const auth = getAuth();
const db = getFirestore();

export const signUpUser = async (name, email, password) => {

    try {

        // create firebase authentication user
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        console.log('Auth user created:', user.uid);

        await updateProfile(user, {
            displayName: name,
        })

        await user.reload()

        // create firestore user document

        const userRef = doc(db, 'users', user.uid);

        await setDoc(
            userRef, {
            uid: user.uid,
            id: user.uid,
            name: name,
            email: user.email,
            createdAt: serverTimestamp(),
        }
        );

        return user;
    } catch (error) {
        console.log('Signup error:', error);
        throw error;
    }
};


export const loginUser = async (email, password) => {
    try {

        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (error) {
        console.log('Login Error', error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log('Logout error:', error);
        throw error;
    }
}