import { Dimensions, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { theme } from '../theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { version } from '../../package.json';

var { width, height } = Dimensions.get('window')
const HomeScreen = ({ navigation }) => {
    // const version = Device

    useEffect(() => {
        requestLocationPermission();
    }, []);


    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };




    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.background} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to Mobitech LLP</Text>
                <TouchableOpacity onPress={() => appVersion()}>
                    <Icon name="information-circle" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
                    <Text style={styles.buttonText}>Admin Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Staff')}>
                    <Text style={styles.buttonText}>Staff Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    header: {
        width: width,
        height: height * 0.07,
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    button: {
        backgroundColor: theme.themeColor,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 9999,
        elevation: 3
    },
    buttonText: {
        fontSize: 24,
        color: theme.text,
    }
})