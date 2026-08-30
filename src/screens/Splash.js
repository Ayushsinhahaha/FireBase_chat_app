import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2000)
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/chat.png')} style={styles.logo} />
            <Text style={styles.text}>Firebase Chat Application</Text>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    text: {
        fontSize: 26,
        fontWeight: '800'
    },
    logo: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    }
})