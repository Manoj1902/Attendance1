import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const SignUpAdminScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");

    const showVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigation.navigate('Admin');
    };

    const validateInputs = async () => {
        if (!adminName) return Alert.alert("Name is required");
        if (!adminEmail) return Alert.alert("Email is required");
        if (!adminPassword) return Alert.alert("Password is required");
        if (adminPassword !== adminConfirmPassword) return Alert.alert("Passwords do not match");

        try {
            await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error: ", error.message);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Admin Sign Up</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={showVersion}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View style={styles.loginImage}>
                <Image source={{ uri: 'http://attendance.mobitechllp.com/assets/login.png' }} style={styles.image} />
            </View>

            <View style={styles.card}>
                <View style={styles.input}>
                    {[
                        { title: 'Name', value: adminName, onChange: setAdminName, icon: 'person-sharp' },
                        { title: 'Email', value: adminEmail, onChange: setAdminEmail, icon: 'mail' },
                        { title: 'Password', value: adminPassword, onChange: setAdminPassword, icon: 'lock-closed', secureTextEntry: hidePassword, toggleVisibility: () => setHidePassword(!hidePassword) },
                        { title: 'Confirm Password', value: adminConfirmPassword, onChange: setAdminConfirmPassword, icon: 'lock-closed', secureTextEntry: hideConfirmPassword, toggleVisibility: () => setHideConfirmPassword(!hideConfirmPassword) }
                    ].map((field, index) => (
                        <View key={index}>
                            <Text style={styles.inputTitle}>{field.title}</Text>
                            <View style={styles.inputContainer}>
                                <Icon name={field.icon} size={20} color={theme.blackText} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor="#808080"
                                    placeholder={field.title}
                                    secureTextEntry={field.secureTextEntry}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                />
                                {field.toggleVisibility && (
                                    <TouchableOpacity onPress={field.toggleVisibility}>
                                        <Icon name={field.secureTextEntry ? 'eye' : 'eye-outline'} size={20} color={theme.blackText} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.signupBtn} onPress={validateInputs}>
                        <Text style={styles.signupBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
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
        width,
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
        height: height * 0.68,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
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
        shadowOffset: { width: 0, height: 3 },
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

export default SignUpAdminScreen;
