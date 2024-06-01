import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../theme'
import { version } from '../../package.json'



var { width, height } = Dimensions.get('window')
const InsertEmployeeScreen = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const handleInsert = () => {

        let uName = name
        let uEmail = email
        let uPassword = password

        if (uName.length == 0 || uEmail == 0 || uPassword == 0) {
            Alert.alert("Required Field is Missing");
        } else {
            var InsertURL = 'http://192.168.137.1/api/insert.php'

            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            var Data = {
                Name: uName,
                Email: uEmail,
                Password: uPassword
            }

            fetch(InsertURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            })
                .then((response) => response.json())
                .then((response) => {
                    Alert.alert(response[0].Message)
                })
                .catch((error) => {
                    Alert.alert('Error: ' + error)
                })
        }

        setName('')
        setEmail('')
        setPassword('')

    }

    return (
        <View style={styles.container}>
            <SafeAreaView >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={34} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Insert Employee</Text>

                    <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View>
                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                            <TextInput style={{ width: width * 0.83, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Name' value={name} onChangeText={value => setName(value)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='at-sharp' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                            <TextInput keyboardType='email-address' style={{ width: width * 0.83, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Email' value={email} onChangeText={value => setEmail(value)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                            <TextInput style={{ width: width * 0.75, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Password' secureTextEntry={hidePassword} value={password} onChangeText={value => setPassword(value)} />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                {
                                    hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.text} />
                                        :
                                        <Icon name='eye-outline' padding={8} size={20} color={theme.text} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.insertBtn} onPress={handleInsert}>
                        <Text style={styles.insertBtnText}>
                            Insert
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default InsertEmployeeScreen

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
    input: {
        // backgroundColor: 'red',
        marginTop: 28,
        padding: 8,
        gap: 30
    },
    inputTitle: {
        paddingHorizontal: 8,
        marginBottom: 4,
        color: theme.text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: 'blue',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e'
    },
    insertBtn: {
        padding: 10,
        backgroundColor: theme.themeColor,
        width: 155,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    insertBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})