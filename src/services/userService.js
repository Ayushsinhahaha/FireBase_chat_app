import {
    getFirestore,
    collection,
    doc,
    setDoc,
    serverTimestamp,
    getDocs,
    getDoc,
    query,
    where
} from '@react-native-firebase/firestore';
import { useRef } from 'react';

const db = getFirestore();

//get all the registered users except the logged in user
export const getUsers = async currentUserId => {
    try {
        const usersRef = collection(db,'users');
        const q=query(useRef,where('id','!=',currentUserId));

        const querySnapshot= await getDocs(q);
        const usersList=[];

        querySnapshot.forEach((docSnapshot)=>{
            usersList.push({
                id:docSnapshot.id,
                ...docSnapshot.data(),
            });
        });
        return usersList;
        } catch (error) {
            console.log('Error fetching users:',error);
            throw error;
        }
};

export const getUserById = async uid => {
    const userDocument =
        doc(db, 'users', uid);

    const documentSnapshot =
        await getDoc(userDocument);

    if (!documentSnapshot.exists()) return null;

    return {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
    }
}