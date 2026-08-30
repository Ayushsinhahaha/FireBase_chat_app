import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth'
import { getUsers } from '../services/userService'

const auth = getAuth();

const Users = ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser;

    const loadUsers = async (uid) => {
        try {
            const usersList = await getUsers(uid);
            setUsers(usersList);
        } catch (error) {
            console.log('Error in fetching users', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                loadUsers(user.uid);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#fff' />
            </SafeAreaView>
        )
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>USERS</Text>
            <FlatList data={users} keyExtractor={item => item.id} renderItem={({ item }) => (
                <TouchableOpacity style={styles.userItem} onPress={() => navigation.navigate('Chat', {
                    receiverId: item.id,
                    receiverName: item.name
                })} >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </TouchableOpacity>
            )} />
        </SafeAreaView>
    )
}

export default Users

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    userItem: {
        padding: 18,
        borderWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
        marginVertical: 20
    },
    name: {
        fontSize: 18,
        fontWeight: '600'
    },
    email: {
        marginTop: 5,
        color: '#777'
    }
})