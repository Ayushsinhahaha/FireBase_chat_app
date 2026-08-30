import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import Users from '../screens/Users'
import Chat from '../screens/Chat'
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return (
        <NavigationContainer  >
            {user ? (
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Users' component={Users} />
                    <Stack.Screen name='Chat' component={Chat} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Splash' component={Splash} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Signup' component={Signup} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default AppNavigator