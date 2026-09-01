import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from '@react-native-firebase/auth';
import { doc, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            error => {
                console.log('Firestore error', error)
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome, <Text style={styles.nameText}>{userData?.name || auth.currentUser?.displayName || 'User'}</Text>!</Text>
            {/* <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
                <Text>Chats</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Users')}>
                <Text style={styles.userText}>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'dodgerblue',
    },
    title: {
        fontSize: 24,
        marginVertical: 20
    },
    chatButton: {
        marginTop: 20,
        padding: 10,
        // borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'dodgerblue',
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    userText: {
        fontSize: 22,
        textTransform: 'uppercase',
        color: '#fff'
    },
    logoutButton: {
        marginTop: 20,
        // padding: 10,
        // borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 80,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    logoutText: {
        textAlign: 'center',
        fontSize: 22,
        textTransform: 'uppercase',
        color: '#fff'
    },
    nameText: {
        color: 'dodgerblue',
        fontWeight: 'bold',
    }
})