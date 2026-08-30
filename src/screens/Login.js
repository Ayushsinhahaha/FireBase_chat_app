import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        try {
            setLoading(true);

            await signInWithEmailAndPassword(auth, email.trim(), password);

        } catch (error) {
            console.log('Login Error:', error);
            if (error.code === 'auth/invalid-credentials') {
                Alert.alert('Error', 'Invalid Credentials');
            } else if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'User not found');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Error', 'Wrong Password');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    }




    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
                <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

                    <Text style={styles.title}>LOGIN</Text>

                    {/* inputs */}
                    {/* <TextInput value={name} onChangeText={txt=>setName(txt)} placeholderTextColor='black' placeholder='Enter Name' style={[styles.input, { marginTop: 50 }]} /> */}
                    <TextInput value={email} onChangeText={txt => setEmail(txt)} placeholderTextColor='black' placeholder='Enter Email' style={[styles.input, { marginTop: 100 }]} />
                    {/* <TextInput value={mobile} onChangeText={txt=>setMobile(txt)}  keyboardType='number-pad' placeholderTextColor='black' placeholder='Enter Mobile' style={styles.input} /> */}
                    <TextInput value={password} onChangeText={txt => setPassword(txt)} placeholderTextColor='black' placeholder='Enter Password' style={styles.input} />
                    {/* <TextInput value={cPassword} onChangeText={txt=>setCPassword(txt)} placeholderTextColor='black' placeholder='Confirm Password' style={styles.input} /> */}
                    <TouchableOpacity onPress={handleLogin} activeOpacity={0.6} style={[styles.button, { marginTop: 100 }]}>
                        <Text style={styles.signupText}>LOGIN</Text>
                    </TouchableOpacity>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.loginBtn}><Text style={styles.loginText}>Signup</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 100,
        fontWeight: '800',
        color: 'dodgerblue'
    },
    input: {
        alignSelf: 'center',
        width: '90%',
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginTop: 20,
        height: 60,
        borderRadius: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    button: {
        width: '90%',
        height: 80,
        borderRadius: 10,
        // borderWidth: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: 'dodgerblue'
    },
    signupText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#fff'
    },
    questionContainer: {
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    questionText: {
        alignSelf: 'center',
        marginTop: 10
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: 'dodgerblue',
        alignSelf: 'center',
        marginTop: 10
    }

})