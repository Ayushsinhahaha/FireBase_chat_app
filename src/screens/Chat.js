import React, {
    useEffect,
    useState,
} from 'react';

import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import {
    getChatId,
} from '../utils/chatUtils';


const Chat = ({route}) => {

    const {
        receiverId,
        receiverName,
    } = route.params;


    const currentUser =
        auth().currentUser;


    const [message, setMessage] =
        useState('');

    const [messages, setMessages] =
        useState([]);


    const chatId = getChatId(
        currentUser.uid,
        receiverId,
    );


    /*
        REAL TIME MESSAGE LISTENER
    */

    useEffect(() => {

        const unsubscribe =
            firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy(
                    'createdAt',
                    'asc',
                )
                .onSnapshot(
                    snapshot => {

                        const messagesList =
                            snapshot.docs.map(
                                doc => ({
                                    id: doc.id,
                                    ...doc.data(),
                                }),
                            );


                        setMessages(
                            messagesList,
                        );

                    },
                    error => {

                        console.log(
                            'Message listener error:',
                            error,
                        );

                    },
                );


        return unsubscribe;

    }, [chatId]);


    /*
        SEND MESSAGE
    */

    const handleSendMessage =
        async () => {

            if (!message.trim()) {
                return;
            }


            const text =
                message.trim();


            setMessage('');


            try {

                // Create chat document
                await firestore()
                    .collection('chats')
                    .doc(chatId)
                    .set(
                        {

                            participants: [
                                currentUser.uid,
                                receiverId,
                            ],

                            lastMessage:
                                text,

                            lastMessageAt:
                                firestore.FieldValue
                                    .serverTimestamp(),

                        },
                        {
                            merge: true,
                        },
                    );


                // Add message
                await firestore()
                    .collection('chats')
                    .doc(chatId)
                    .collection('messages')
                    .add({

                        senderId:
                            currentUser.uid,

                        receiverId:
                            receiverId,

                        text: text,

                        createdAt:
                            firestore.FieldValue
                                .serverTimestamp(),

                    });


            } catch (error) {

                console.log(
                    'Send message error:',
                    error,
                );

                setMessage(text);

            }

        };


    return (
        <KeyboardAvoidingView
            style={styles.container}

            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >

            {/* Header */}

            <View style={styles.header}>

                <Text style={styles.headerName}>
                    {receiverName}
                </Text>

            </View>


            {/* Messages */}

            <FlatList
                data={messages}

                keyExtractor={item =>
                    item.id
                }

                contentContainerStyle={
                    styles.messagesContainer
                }

                renderItem={({item}) => {

                    const isMyMessage =
                        item.senderId ===
                        currentUser.uid;


                    return (

                        <View
                            style={[
                                styles.messageBubble,

                                isMyMessage
                                    ? styles.myMessage
                                    : styles.otherMessage,
                            ]}
                        >

                            <Text
                                style={
                                    isMyMessage
                                        ? styles.myMessageText
                                        : styles.otherMessageText
                                }
                            >
                                {item.text}
                            </Text>

                        </View>

                    );

                }}

            />


            {/* Input */}

            <View
                style={styles.inputContainer}
            >

                <TextInput
                    value={message}

                    onChangeText={txt =>
                        setMessage(txt)
                    }

                    placeholder="Type a message..."

                    style={styles.input}
                />


                <TouchableOpacity
                    style={styles.sendButton}

                    onPress={
                        handleSendMessage
                    }
                >

                    <Text
                        style={
                            styles.sendText
                        }
                    >
                        SEND
                    </Text>

                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    );
};


export default Chat;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    headerName: {
        fontSize: 20,
        fontWeight: '800',
    },

    messagesContainer: {
        padding: 15,
    },

    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
    },

    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'dodgerblue',
    },

    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#eeeeee',
    },

    myMessageText: {
        color: 'white',
        fontSize: 16,
    },

    otherMessageText: {
        color: 'black',
        fontSize: 16,
    },

    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
    },

    sendButton: {
        marginLeft: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    sendText: {
        color: 'dodgerblue',
        fontWeight: '800',
    },

});