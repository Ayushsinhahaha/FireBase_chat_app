import React, {
    useEffect,
    useState,
} from 'react';


import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';


const Users = ({ navigation }) => {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const auth = getAuth();
    const firestore = getFirestore();

    useEffect(() => {

        const currentUser =
            auth.currentUser;

        const userRef = collection(firestore, 'users');

        const unsubscribe =
            onSnapshot(
                userRef,
                snapshot => {
                    const usersList =
                        snapshot.docs
                            .map(doc => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                            .filter(
                                item =>
                                    item.uid !==
                                    currentUser.uid,
                            );


                    setUsers(usersList);

                    setLoading(false);
                },
                error => {

                    console.log(
                        'Users error:',
                        error,
                    );

                    setLoading(false);

                },
            );


        return unsubscribe;

    }, []);


    if (loading) {

        return (
            <View style={styles.loader}>

                <ActivityIndicator
                    size="large"
                />

            </View>
        );

    }


    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>
                USERS
            </Text>


            <FlatList
                data={users}

                keyExtractor={item =>
                    item.uid
                }

                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={styles.userCard}

                        onPress={() =>
                            navigation.navigate(
                                'Chat',
                                {
                                    receiverId:
                                        item.uid,

                                    receiverName:
                                        item.name,
                                },
                            )
                        }
                    >

                        <View
                            style={styles.avatar}
                        >

                            <Text
                                style={
                                    styles.avatarText
                                }
                            >
                                {item.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </Text>

                        </View>


                        <View>

                            <Text
                                style={
                                    styles.userName
                                }
                            >
                                {item.name}
                            </Text>


                            <Text
                                style={
                                    styles.email
                                }
                            >
                                {item.email}
                            </Text>

                        </View>

                    </TouchableOpacity>

                )}

                ListEmptyComponent={
                    <Text
                        style={
                            styles.emptyText
                        }
                    >
                        No other users found.
                    </Text>
                }

            />

        </SafeAreaView>
    );
};


export default Users;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 25,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
    },

    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    avatarText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
    },

    userName: {
        fontSize: 18,
        fontWeight: '700',
    },

    email: {
        color: 'gray',
        marginTop: 4,
    },

    emptyText: {
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 16,
        color: 'gray',
    },

});