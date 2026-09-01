import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GiftedChatModule from 'react-native-gifted-chat';
import { getAuth } from '@react-native-firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from '@react-native-firebase/firestore';
import { getChatId } from '../utils/chatUtils';

// Safe resolver for GiftedChat module
const GiftedChat =
    GiftedChatModule.default?.GiftedChat ||
    GiftedChatModule.GiftedChat ||
    GiftedChatModule.default ||
    GiftedChatModule;

const auth = getAuth();
const db = getFirestore();

const Chat = ({ navigation, route }) => {
    // 1. All hooks declared unconditionally at the very top
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const { receiverId, receiverName } = route?.params || {};
    const currentUser = auth.currentUser;

    const chatId =
        currentUser && receiverId
            ? getChatId(currentUser.uid, receiverId)
            : null;

    // Header options
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    // Real-time Firestore messages listener
    useEffect(() => {
        if (!chatId) {
            setLoading(false);
            return;
        }

        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const fetchedMessages = querySnapshot.docs.map((docSnap) => {
                    const data = docSnap.data();

                    return {
                        _id: docSnap.id,
                        text: data.text || '',
                        createdAt: data.createdAt
                            ? data.createdAt.toDate()
                            : new Date(),
                        user: {
                            _id: data.user?._id || '',
                            name: data.user?.name || 'User',
                            avatar: data.user?.avatar || 'https://i.pravatar.cc/140?img=3',
                        },
                    };
                });

                setMessages(fetchedMessages);
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching chat messages:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [chatId]);

    // Send message to Firestore
    const onSend = useCallback(
        async (newMessages = []) => {
            if (newMessages.length === 0 || !chatId || !currentUser) return;

            const message = newMessages[0];

            try {
                const messagesRef = collection(db, 'chats', chatId, 'messages');

                await addDoc(messagesRef, {
                    text: message.text,
                    createdAt: serverTimestamp(),
                    senderId: currentUser.uid,
                    receiverId: receiverId,
                    user: {
                        _id: currentUser.uid,
                        name: currentUser.displayName || currentUser.email || 'User',
                        avatar: currentUser.photoURL || 'https://i.pravatar.cc/140?img=12',
                    },
                });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
        [chatId, currentUser, receiverId]
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.headerDetails}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {receiverName || 'Chat'}
                    </Text>
                    <Text style={styles.headerSubtitle}>Online</Text>
                </View>
            </View>

            {/* Chat Body or Loader */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="dodgerblue" />
                </View>
            ) : (
                <KeyboardAvoidingView
                    style={styles.chatArea}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                >
                    <GiftedChat
                        messages={messages}
                        onSend={(msgs) => onSend(msgs)}
                        user={{
                            _id: currentUser?.uid || '',
                            name: currentUser?.displayName || currentUser?.email || 'Me',
                        }}
                        showUserAvatar={true}
                        alwaysShowSend={true}
                        placeholder="Type a message..."
                        keyboardShouldPersistTaps="never"
                        bottomOffset={Platform.OS === 'ios' ? insets.bottom : 0}
                        listViewProps={{
                            keyboardDismissMode: 'on-drag',
                        }}
                    />
                </KeyboardAvoidingView>
            )}
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'dodgerblue',
    },
    backButton: {
        paddingRight: 14,
        paddingBottom: 2,
    },
    backButtonText: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '300',
        lineHeight: 34,
    },
    headerDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#e0f2fe',
        marginTop: 1,
    },
    chatArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});