import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Users from '../screens/Users';
import Chat from '../screens/Chat';
import Home from '../screens/Home';

const Stack = createStackNavigator();


const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Users' component={Users} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    )
}

export default MainNavigator
