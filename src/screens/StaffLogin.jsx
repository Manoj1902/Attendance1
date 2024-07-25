import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Dimensions, Image, Pressable, ToastAndroid } from 'react-native';
import axios from 'axios';
import StaffDashboard from './StaffDashboard';
import { theme } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { version } from '../../package.json';

var { width, height } = Dimensions.get('window')
const StaffLogin = ({ navigation }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [employee, setEmployee] = useState(null);
    const [hidePassword, setHidePassword] = useState(true)
    const [disableLoginBtn, setDisableLoginBtn] = useState(false)

    const handleLogin = async () => {
        try {
            // console.log('Attempting to log in with mobile:', mobile, 'and password:', password);
            const response = await axios.post('http://attendance.mobitechllp.com/login.php', {
                mobile
                // password
            });

            // console.log('Login response:', response.data);

            if (response.data.status === 'success') {
                setEmployee(response.data.employee);
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Failed to log in. Please try again.');
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
        < >
            {
                employee ? (
                    <StaffDashboard employee={employee} />
                ) : (
                    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                        <SafeAreaView>
                            {/* Header */}
                            <View style={styles.header}>

                                <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                                    <Icon name="chevron-back" size={34} color="white" />
                                </TouchableOpacity>

                                <Text style={styles.headerText}>Staff Login</Text>

                                <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                                    <Icon name="information-circle" size={35} color="white" />
                                </TouchableOpacity>

                            </View>
                        </SafeAreaView>

                        <View style={styles.loginImage}>
                            <Image source={{ uri: 'http://attendance.mobitechllp.com/assets/staff_login.png' }}
                                style={{
                                    height: 165,
                                    width: 280,
                                    justifyContent: 'center'
                                }} />
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Login with mobile number</Text>

                            <View style={styles.input}>
                                <View>
                                    <Text style={styles.inputTitle}>Mobile</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name='phone-portrait' padding={8} size={20} color={theme.blackText} />
                                        <TextInput keyboardType='number-pad'
                                            style={{
                                                width: width * 0.65,
                                                color: theme.blackText,
                                                textAlign: 'center',
                                                // backgroundColor: 'red'
                                            }}
                                            placeholderTextColor={"#808080"} placeholder='Mobile' value={mobile} onChangeText={setMobile} />
                                    </View>
                                </View>


                                {/* <View>

                                    <Text style={styles.inputTitle}>Password</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />
                                        <TextInput style={{ width: width * 0.62, color: theme.blackText }} placeholderTextColor={"#808080"} placeholder='Password' secureTextEntry={hidePassword} value={password} onChangeText={setPassword} />
                                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                            {
                                                hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                                    :
                                                    <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                                        </TouchableOpacity>
                                    </View>

                                </View> */}

                                <TouchableOpacity style={{
                                    backgroundColor: disableLoginBtn ? '#858585' : theme.themeColor,
                                    width: 150,
                                    paddingHorizontal: 22,
                                    paddingVertical: 12,
                                    alignSelf: 'center',
                                    elevation: 3,
                                    borderRadius: 10
                                }} onPress={handleLogin} disabled={disableLoginBtn}>
                                    <Text style={styles.loginBtnText}>Login</Text>
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: theme.blackText }}>Click here if you are </Text>
                                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('Admin')} disabled={disableLoginBtn}>
                                        <Text style={{
                                            color: theme.themeColor,
                                            fontWeight: '800',
                                            fontSize: 16
                                        }}>
                                            Admin !
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                )
            }





        </ >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',

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
    loginContainer: {
        justifyContent: 'center',
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: theme.blackText
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
    loginImage: {
        width: width,
        height: height * 0.25,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        height: height * 0.68,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
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
        // backgroundColor: 'red',
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
        // justifyContent: '',
        // backgroundColor: 'blue',
        gap: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e'
    },
    loginBtn: {


    },
    loginBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,

    }
});

export default StaffLogin;
