import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Icon from 'react-native-vector-icons/AntDesign'


var { width, height } = Dimensions.get('window')

const AdminDashboard = ({ navigation }) => {

    const [logoutBtnDisabled, setLogoutBtnDisabled] = useState(false)

    const handleLogout = async () => {
        setLogoutBtnDisabled(true)
        await signOut(auth)
        navigation.navigate('Admin')
        setLogoutBtnDisabled(false)
    }
    return (
        <View style={styles.container} >
            <SafeAreaView >

                {/* Header */}
                <View style={styles.header}>


                    <Text style={styles.headerText}>Admin Dashboard</Text>

                    <TouchableOpacity style={styles.iconButton} onPress={handleLogout} disabled={logoutBtnDisabled} >
                        <Icon name="logout" size={30} color="white" paddingHorizontal={10} />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

            <View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('InsertEmployee')}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: theme.text
                        }}>Insert Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('ShowAllEmployee')}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: theme.text
                        }}>Show Employee</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

    },
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 12
    },
    iconBackButton: {
        backgroundColor: theme.themeColor,
        padding: 4,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text
    },
    insertScreenBtn: {
        padding: 10,
        backgroundColor: theme.themeColor,
        marginTop: 22,
        marginHorizontal: 8,
        width: 170,
        borderRadius: 10,
    }
})