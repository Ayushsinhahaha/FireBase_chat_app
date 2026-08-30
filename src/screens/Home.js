import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    getAuth,
    onAuthStateChanged,
} from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log('Logout Error:', error);
        }
    }


    return (
        <View style={styles.container}>
            <Text>Welcome, {user?.displayName} !</Text>
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Users')}>
                <Text>Start Chatting</Text>
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
    },
    chatButton: {
        marginTop: 20,
        padding: 10,
        borderWidth:1,
        borderRadius:10
    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        borderWidth:1,
        borderRadius:10
    }
})