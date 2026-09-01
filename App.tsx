import { StyleSheet, Text, View, LogBox } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { AuthProvider } from './src/context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider >
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})