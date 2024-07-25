import {
    Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid,
    TouchableOpacity, View, Pressable
} from 'react-native';
import React, { useState } from 'react';
import { theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const { width, height } = Dimensions.get('window');

const AdminLoginScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);

    const handleSubmit = async () => {
        setDisableLoginBtn(true);
        if (adminEmail && adminPassword) {
            try {
                await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
                setDisableLoginBtn(true);
            } catch (error) {
                Alert.alert('Error', "Error while Login: ", error);
                setDisableLoginBtn(false);
            }
        } else {
            Alert.alert('Please enter fields');
            setDisableLoginBtn(false);
        }
        setDisableLoginBtn(false);
    };

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const checkUserPassword = () => {
        if (adminEmail === 'Admin' && adminPassword === 'Password') {
            navigation.pop();
            navigation.navigate('AdminDashboard');
            setAdminEmail("");
            setAdminPassword("");
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Admin Login</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={appVersion}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View style={styles.loginImage}>
                <Image
                    source={{ uri: 'http://attendance.mobitechllp.com/assets/login.png' }}
                    style={styles.loginImageStyle}
                />
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Login</Text>
                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' size={20} color={theme.blackText} style={styles.iconStyle} />
                            <TextInput
                                keyboardType='email-address'
                                style={styles.textInput}
                                placeholderTextColor={"#808080"}
                                placeholder='Email'
                                value={adminEmail}
                                onChangeText={setAdminEmail}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' size={20} color={theme.blackText} style={styles.iconStyle} />
                            <TextInput
                                style={styles.passwordInput}
                                placeholderTextColor={"#808080"}
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                                value={adminPassword}
                                onChangeText={setAdminPassword}
                            />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                <Icon
                                    name={hidePassword ? 'eye' : 'eye-outline'}
                                    size={20}
                                    color={theme.blackText}
                                    style={styles.iconStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.loginBtn, { backgroundColor: disableLoginBtn ? '#858585' : theme.themeColor }]}
                        onPress={handleSubmit}
                        disabled={disableLoginBtn}
                    >
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <Text style={{ color: theme.blackText }}>Click here for </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Staff')} disabled={disableLoginBtn}>
                            <Text style={styles.staffLoginText}>Staff Login !</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default AdminLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 12,
    },
    iconBackButton: {
        backgroundColor: theme.themeColor,
        padding: 4,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text,
    },
    iconButton: {
        backgroundColor: theme.themeColor,
        padding: 4,
        borderRadius: 10,
    },
    loginImage: {
        width: width,
        height: height * 0.25,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginImageStyle: {
        height: 185,
        width: 185,
        justifyContent: 'center',
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
        padding: 20,
    },
    cardTitle: {
        color: theme.blackText,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 28,
        padding: 8,
        gap: 30,
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
        borderColor: '#5e5e5e',
    },
    iconStyle: {
        padding: 8,
        borderRadius: 8,
    },
    textInput: {
        width: width,
        color: theme.blackText,
        borderRadius: 8,
    },
    passwordInput: {
        width: width * 0.62,
        color: theme.blackText,
        borderRadius: 8,
    },
    loginBtn: {
        width: 150,
        backgroundColor: theme.themeColor,
        paddingVertical: 12,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    loginBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 30,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    staffLoginText: {
        color: theme.themeColor,
        fontWeight: '800',
        fontSize: 16,
    },
});
