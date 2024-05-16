import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const AdminDashboard = ({ navigation }) => {

    const handleLogout = async () => {
        await signOut(auth)
        navigation.pop()
        navigation.navigate('Home')
    }
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <Text>Admin Dashboard</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
                <Text style={styles.loginBtnText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AdminDashboard

const styles = StyleSheet.create({
    loginBtn: {
        backgroundColor: theme.themeColor,
        width: 150,
        paddingHorizontal: 22,
        paddingVertical: 12,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10

    },
    loginBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,

    }
})