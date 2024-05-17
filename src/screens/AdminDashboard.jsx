import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const AdminDashboard = ({ navigation }) => {

    const [logoutBtnDisabled, setLogoutBtnDisabled] = useState(false)

    const handleLogout = async () => {
        setLogoutBtnDisabled(true)
        await signOut(auth)
        navigation.navigate('Admin')
        setLogoutBtnDisabled(false)
    }
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <Text>Admin Dashboard</Text>
            <TouchableOpacity style={{
                backgroundColor: logoutBtnDisabled ? '#858585' : theme.themeColor,
                width: 150,
                paddingHorizontal: 22,
                paddingVertical: 12,
                alignSelf: 'center',
                elevation: 3,
                borderRadius: 10
            }} onPress={handleLogout} disabled={logoutBtnDisabled}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AdminDashboard

const styles = StyleSheet.create({
    logoutBtn: {
        backgroundColor: theme.themeColor,
        width: 150,
        paddingHorizontal: 22,
        paddingVertical: 12,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10

    },
    logoutBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,

    }
})