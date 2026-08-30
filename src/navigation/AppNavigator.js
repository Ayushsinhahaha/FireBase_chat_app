import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import Users from '../screens/Users'
import Chat from '../screens/Chat'
import { useAuth } from '../context/AuthContext';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            firebaseUser => {
                setUser(firebaseUser);
                setLoading(false);
            }
        );
        return unsubscribe;
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#fff' />
            </View>
        )
    }

    return (
        <NavigationContainer  >
            {user ? (
                <MainNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    )
}

export default AppNavigator