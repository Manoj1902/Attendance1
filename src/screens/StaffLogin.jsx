import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Dimensions, Image, ToastAndroid } from 'react-native';
import axios from 'axios';
import StaffDashboard from './StaffDashboard';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { version } from '../../package.json';

const { width, height } = Dimensions.get('window');

const StaffLogin = ({ navigation }) => {
    const [mobile, setMobile] = useState('');
    const [employee, setEmployee] = useState(null);
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);

    const handleLogin = async () => {
        setDisableLoginBtn(true);
        try {
            const response = await axios.post('http://attendance.mobitechllp.com/login.php', { mobile });
            if (response.data.status === 'success') {
                setEmployee(response.data.employee);
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to log in. Please try again.');
        } finally {
            setDisableLoginBtn(false);
        }
    };

    const showAppVersion = () => {
        ToastAndroid.showWithGravity(
            `Version: ${version}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    return (
        <>
            {employee ? (
                <StaffDashboard employee={employee} />
            ) : (
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <SafeAreaView>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                                <Icon name="chevron-back" size={34} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Staff Login</Text>
                            <TouchableOpacity style={styles.iconButton} onPress={showAppVersion}>
                                <Icon name="information-circle" size={35} color="white" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    <View style={styles.loginImage}>
                        <Image
                            source={{ uri: 'http://attendance.mobitechllp.com/assets/staff_login.png' }}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Login with mobile number</Text>
                        <View style={styles.input}>
                            {/* <Text style={styles.inputTitle}>Mobile</Text> */}
                            <View style={styles.inputContainer}>
                                <Icon name='phone-portrait' size={20} color={theme.blackText} />
                                <TextInput
                                    keyboardType='number-pad'
                                    style={styles.textInput}
                                    placeholderTextColor="#808080"
                                    placeholder='Mobile'
                                    value={mobile}
                                    onChangeText={setMobile}
                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.loginBtn, { backgroundColor: disableLoginBtn ? '#858585' : theme.themeColor }]}
                                onPress={handleLogin}
                                disabled={disableLoginBtn}
                            >
                                <Text style={styles.loginBtnText}>Login</Text>
                            </TouchableOpacity>
                            <View style={styles.adminContainer}>
                                <Text style={styles.adminText}>Click here if you are </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Admin')} disabled={disableLoginBtn}>
                                    <Text style={styles.adminLink}>Admin !</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.versionContainer}>
                        <View style={styles.versionBox}>
                            <Text style={styles.versionText}>Version: {version}</Text>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    header: {
        width,
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    iconButton: {
        padding: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    loginImage: {
        width,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 165,
        width: 280,
        marginTop: 50
    },
    card: {
        flex: 1,
        height: height * 0.62,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
        padding: 20
    },
    cardTitle: {
        color: theme.blackText,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 28,
        padding: 8,
        gap: 30
    },
    inputTitle: {
        paddingHorizontal: 8,
        marginBottom: 4,
        color: theme.blackText,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e'
    },
    textInput: {
        width: width * 0.65,
        color: theme.blackText,
        textAlign: 'center',
    },
    loginBtn: {
        width: 150,
        paddingVertical: 12,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    loginBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
    },
    adminContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    adminText: {
        color: theme.blackText
    },
    adminLink: {
        color: theme.themeColor,
        fontWeight: '800',
        fontSize: 16
    },
    versionContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10
    },
    versionBox: {
        alignSelf: 'center',
        backgroundColor: '#d6d6d6',
        padding: 6,
        borderRadius: 6
    },
    versionText: {
        color: '#828282'
    }
});

export default StaffLogin;
