// screens/Chat.js
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth } from '@react-native-firebase/auth';

const auth = getAuth();

const Chat = ({ navigation, route }) => {
    // 1. Get params passed from Users screen
    const { receiverId, receiverName } = route?.params || {};
    const [messages, setMessages] = useState([]);
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (receiverName) {
            navigation.setOptions({ title: receiverName });
        }

        setMessages([
            {
                _id: 1,
                text: `Conversation started with ${receiverName || 'User'}`,
                createdAt: new Date(),
                user: {
                    _id: receiverId || '2',
                    name: receiverName || 'Receiver',
                },
            },
        ]);
    }, [receiverName, receiverId]);

    // 2. Safe onSend without relying on GiftedChat.append
    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages => [...newMessages, ...previousMessages]);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={msgs => onSend(msgs)}
                user={{
                    _id: currentUser?.uid || '1',
                    name: currentUser?.displayName || 'You',
                }}
            />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});