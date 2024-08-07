import React, { useEffect } from 'react';
import {
    Alert,
    Dimensions,
    PermissionsAndroid,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import { version } from '../../package.json';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            requestLocationPermission();
        }
    }, [isFocused]);

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

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                if (isFocused) {
                    ToastAndroid.showWithGravity(
                        'Location permission not granted',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }
        } catch (err) {
            if (isFocused) {
                Alert.alert('Error', err.message);
            }
        }
    };

    const showAppVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mobitech Attendance</Text>
                <TouchableOpacity onPress={showAppVersion}>
                    <Icon name="information-circle" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
                <ButtonWithIcon
                    icon="shield"
                    label="Admin Login"
                    onPress={() => navigation.navigate('Admin')}
                />
                <ButtonWithIcon
                    icon="people-sharp"
                    label="Staff Login"
                    onPress={() => navigation.navigate('Staff')}
                />
            </View>

            <View style={styles.versionContainer}>
                <View style={styles.versionBox}>
                    <Text style={styles.versionText}>Version: {version}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const ButtonWithIcon = ({ icon, label, onPress }) => (
    <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={icon} size={45} color="white" />
        </TouchableOpacity>
        <Text style={styles.buttonText}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    header: {
        width,
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: theme.themeColor,
        borderRadius: 50,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: theme.text,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    versionContainer: {
        backgroundColor: theme.background,
        alignItems: 'center',
        padding: 10,
    },
    versionBox: {
        alignSelf: 'center',
        backgroundColor: '#414149',
        padding: 6,
        borderRadius: 6,
    },
    versionText: {
        color: '#828282',
    },
});

export default HomeScreen;
