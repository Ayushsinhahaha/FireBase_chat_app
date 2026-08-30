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

const db = getFirestore();

//get all the registered users except the logged in user
export const getUsers = async currentUserId => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '!=', currentUserId));

        const querySnapshot = await getDocs(q);
        const usersList = [];

        querySnapshot.forEach((docSnapshot) => {
            usersList.push({
                id: docSnapshot.id,
                ...docSnapshot.data(),
            });
        });
        console.log('Users fetched:', usersList);
        return usersList;
    } catch (error) {
        console.log('Error fetching users:', error);
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