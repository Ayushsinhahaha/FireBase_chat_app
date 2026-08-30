import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

import {
    getAuth,
    onAuthStateChanged,
} from '@react-native-firebase/auth';


const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();



    const handleSignup = async () => {
        //validate
        if (!name || !email || !mobile || !password || !cPassword) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        //check password
        if (password !== cPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        //password length
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            //create firebase auth user
            const userCredential = await auth.createUserWithEmailAndPassword(email.trim(), password)
            //firebase generated uid
            const uid = userCredential.user.uid;

            //update firebase auth profile
            await userCredential.user.updateProfile({
                displayName: name.trim(),
            });

            //create user document in firestore
            await firestore().collection("users").doc(uid).set({
                uid: uid,
                name: name.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            Alert.alert('Success', 'Account Created Succeffully')


        } catch (error) {
            console.log('Signup error:', error);

            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email already in use');
            }
            else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Invalid email');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'Weak password');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }

    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>SIGNUP</Text>

            {/* inputs */}
            <TextInput value={name} onChangeText={txt => setName(txt)} placeholderTextColor='black' placeholder='Enter Name' style={[styles.input, { marginTop: 50 }]} />
            <TextInput value={email} onChangeText={txt => setEmail(txt)} placeholderTextColor='black' placeholder='Enter Email' style={styles.input} />
            <TextInput value={mobile} onChangeText={txt => setMobile(txt)} keyboardType='number-pad' placeholderTextColor='black' placeholder='Enter Mobile' style={styles.input} />
            <TextInput value={password} onChangeText={txt => setPassword(txt)} placeholderTextColor='black' placeholder='Enter Password' style={styles.input} />
            <TextInput value={cPassword} onChangeText={txt => setCPassword(txt)} placeholderTextColor='black' placeholder='Confirm Password' style={styles.input} />
            <TouchableOpacity onPress={handleSignup} activeOpacity={0.6} style={styles.button}>
                <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginBtn}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
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