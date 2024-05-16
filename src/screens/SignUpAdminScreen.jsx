import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { version } from '../../package.json'
import { Pressable } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'


var { width, height } = Dimensions.get('window')

const SignUpAdminScreen = ({ navigation }) => {
    // Admin User Password
    const Admin = "Manoj"
    const Password = "Manoj@123"

    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
    const [adminName, setAdminName] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("")

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const checkInputs = async () => {
        if (adminName) {
            if (adminEmail) {
                if (adminPassword) {
                    if (adminPassword == adminConfirmPassword) {
                        try {
                            await createUserWithEmailAndPassword(auth, adminName, adminEmail, adminPassword)
                        } catch (error) {
                            console.log("Error: ", error)
                        }
                    }
                }
            }
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView >


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
                <Image source={require('../assets/login.png')}
                    style={{ height: 165, width: 165, justifyContent: 'center' }} />
            </View>

            <View style={styles.card}>

                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' padding={8} size={20} color={theme.blackText} />
                            <TextInput style={{ width: width, color: theme.blackText }} placeholderTextColor={"#808080"} placeholder='Name' value={adminName} onChangeText={value => setAdminName(value)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='mail' padding={8} size={20} color={theme.blackText} />
                            <TextInput style={{ width: width, color: theme.blackText }} placeholderTextColor={"#808080"} placeholder='Email' value={adminEmail} onChangeText={value => setAdminEmail(value)} />
                        </View>
                    </View>
                    <View>

                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />
                            <TextInput
                                style={{
                                    width: width * 0.62,
                                    color: theme.blackText
                                }}
                                placeholderTextColor={"#808080"}
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                                value={adminPassword}
                                onChangeText={value => setAdminPassword(value)} />

                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                {
                                    hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                        :
                                        <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>

                        <Text style={styles.inputTitle}>Confirm Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.blackText} />

                            <TextInput
                                style={{
                                    width: width * 0.62,
                                    color: theme.blackText
                                }}
                                placeholderTextColor={"#808080"}
                                placeholder='Confirm Password'
                                secureTextEntry={hideConfirmPassword}
                                value={adminConfirmPassword}
                                onChangeText={value => setAdminConfirmPassword(value)} />

                            <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                                {
                                    hideConfirmPassword ? <Icon name='eye' padding={8} size={20} color={theme.blackText} />
                                        :
                                        <Icon name='eye-outline' padding={8} size={20} color={theme.blackText} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => checkInputs()}>
                        <Text style={styles.loginBtnText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}>
                        <Text style={{ color: theme.blackText, fontSize: 16 }}>Already Have Account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                            <Text style={{ color: theme.themeColor, fontWeight: 'bold', fontSize: 18 }}> Login.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

export default SignUpAdminScreen

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
        // backgroundColor: 'red',
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
        // justifyContent: '',
        // backgroundColor: 'blue',
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
})