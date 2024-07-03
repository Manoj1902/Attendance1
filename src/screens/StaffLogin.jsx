import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';
import { Pressable } from 'react-native';
import axios from 'axios';

var { width, height } = Dimensions.get('window');

const StaffLogin = ({ navigation }) => {
    const [Mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.137.1/api/login.php', {
                Mobile: Mobile,
                Password: password,
            });
            if (response.data.Status) {
                const { employeeName, employeeMobile } = response.data; // Assuming response includes these details
                Alert.alert('Success', response.data.Message);
                navigation.navigate('StaffDashboard', { employeeName, employeeMobile });
            } else {
                Alert.alert('Error', response.data.Message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'Error logging in. Please try again.');
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
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
                <Image source={require('../assets/staff_login.png')} style={{ height: 165, width: 280, justifyContent: 'center' }} />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Login</Text>
                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Username</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={{ width: width, color: theme.blackText }}
                                placeholderTextColor={"#808080"} placeholder="Mobile"
                                value={Mobile}
                                onChangeText={setMobile}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={{ width: width * 0.62, color: theme.blackText }}
                                placeholderTextColor={"#808080"} placeholder='Password'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={hidePassword}
                            />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                {
                                    hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                        :
                                        <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                            </TouchableOpacity>
                        </View>
                        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text
                                style={{
                                    color: theme.themeColor,
                                    textAlign: 'right',
                                    marginTop: 6,
                                    fontWeight: '600'
                                }}>
                                Forgot Password?
                            </Text>
                        </Pressable>
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default StaffLogin;

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
        marginTop: 28,
        padding: 8,
        gap: 30
    },
    inputTitle: {
        paddingHorizontal: 8,
        marginBottom: 4,
        color: theme.blackText
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e'
    },
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
});