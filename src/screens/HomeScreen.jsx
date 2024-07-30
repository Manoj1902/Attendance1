import { Alert, Dimensions, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
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
                // console.log('Location permission granted');

            } else {
                // console.log('Location permission denied');
                ToastAndroid.showWithGravity(
                    "Location permission not granted",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            }
        } catch (err) {
            Alert.alert("Error", err);
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
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
                        <Icon name={'shield'} size={40} color={'white'} style={{ textAlign: 'center' }} />
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>Admin Login</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Staff')}>
                        <Icon name={'people-sharp'} size={40} color={'white'} style={{ textAlign: 'center' }} />
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>Staff Login</Text>
                </View>
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
        // height: height * 0.07,
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        gap: 50,
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: theme.themeColor,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 9999,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: theme.text,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})