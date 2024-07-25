import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

var { width, height } = Dimensions.get('window');

const SignUpAdminScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const logoutExistingUser = async () => {
        await signOut(auth);
        navigation.navigate('Admin');
    };

    const checkInputs = async () => {
        if (adminName) {
            if (adminEmail) {
                if (adminPassword) {
                    if (adminPassword === adminConfirmPassword) {
                        try {
                            await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
                            navigation.goBack()
                            // Optionally navigate to another screen after successful signup
                        } catch (error) {
                            Alert.alert("Error: ", error);
                        }
                    } else {
                        Alert.alert("Passwords do not match");
                    }
                } else {
                    Alert.alert("Password is required");
                }
            } else {
                Alert.alert("Email is required");
            }
        } else {
            Alert.alert("Name is required");
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Admin Sign Up</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View style={styles.loginImage}>
                <Image source={{ uri: 'http://attendance.mobitechllp.com/assets/login.png' }}
                    style={styles.image} />
            </View>

            <View style={styles.card}>
                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={"#808080"}
                                placeholder='Name'
                                value={adminName}
                                onChangeText={value => setAdminName(value)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='mail' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={"#808080"}
                                placeholder='Email'
                                value={adminEmail}
                                onChangeText={value => setAdminEmail(value)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={[styles.textInput, { width: width * 0.62 }]}
                                placeholderTextColor={"#808080"}
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                                value={adminPassword}
                                onChangeText={value => setAdminPassword(value)} />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                    : <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Confirm Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={[styles.textInput, { width: width * 0.62 }]}
                                placeholderTextColor={"#808080"}
                                placeholder='Confirm Password'
                                secureTextEntry={hideConfirmPassword}
                                value={adminConfirmPassword}
                                onChangeText={value => setAdminConfirmPassword(value)} />
                            <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                                {hideConfirmPassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                    : <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signupBtn} onPress={() => checkInputs()}>
                        <Text style={styles.signupBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpAdminScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
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
    iconBackButton: {
        padding: 4,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    iconButton: {
        padding: 10,
    },
    loginImage: {
        width: width,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        height: 185,
        width: 185,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        padding: 20,
        marginTop: -30,
    },
    input: {
        marginTop: 28,
        gap: 30,
    },
    inputTitle: {
        paddingHorizontal: 8,
        marginBottom: 4,
        color: theme.blackText,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        color: theme.blackText,
    },
    signupBtn: {
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
    signupBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 30,
    }
});
