import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from '@react-native-firebase/auth';
import { doc, getFirestore, onSnapshot } from '@react-native-firebase/firestore';

const auth = getAuth();
const db = getFirestore();
const Home = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        },
        error=>{
            console.log('Firestore error',error)
        }
    );

        return () => unsubscribe();
    }, [navigation])


    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log('Logout Error:', error);
        }
    }


    return (
        <View style={styles.container}>
            <Text>Welcome, {userData?.name || auth.currentUser?.displayName || 'User'}!</Text>
            {/* <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
                <Text>Chats</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Users')}>
                <Text>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
    },
    chatButton: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    }
})