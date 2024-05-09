import { Dimensions, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { version } from '../../package.json'


var { width, height } = Dimensions.get('window')

const AdminLoginScreen = ({ navigation }) => {

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={34} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerText}>Admin Login</Text>

                <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                    <Icon name="information-circle" size={35} color="white" />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default AdminLoginScreen

const styles = StyleSheet.create({
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
    }
})