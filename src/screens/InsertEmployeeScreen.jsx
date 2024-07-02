import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { theme } from '../theme';
import { version } from '../../package.json';

const { width, height } = Dimensions.get('window');

const InsertEmployeeScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [mobile, setMobile] = useState('');
    const [salary, setSalary] = useState('');
    const [imageURI, setImageURI] = useState(null);
    const [password, setPassword] = useState('');

    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0].base64;
                setImageURI(`data:image/jpeg;base64,${source}`);
            }
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const source = response.assets[0].base64;
                setImageURI(`data:image/jpeg;base64,${source}`);
            }
        });
    };

    const handleInsert = () => {
        let uName = name + " (" + department + ")";
        let uMobile = mobile;
        let uSalary = salary;
        let uPassword = password;

        if (uName.length == 0 || uMobile.length == 0 || uSalary.length == 0 || uPassword.length == 0 || imageURI == null) {
            Alert.alert("Required Field is Missing");
        } else {
            var InsertURL = 'http://192.168.137.1/api/insert.php';

            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            var Data = {
                Name: uName,
                Mobile: uMobile,
                Salary: uSalary,
                Password: uPassword,
                Image: imageURI
            };

            fetch(InsertURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            })
                .then((response) => response.text())  // Change to .text() to see the full response
                .then((responseText) => {
                    console.log(responseText);  // Log the raw response
                    try {
                        const responseJson = JSON.parse(responseText);  // Parse the JSON if possible
                        Alert.alert(responseJson[0].Message);
                    } catch (e) {
                        Alert.alert('Error parsing response: ' + e.message);
                    }
                })
                .catch((error) => {
                    Alert.alert('Error: ' + error);
                });

            setName('');
            setMobile('');
            setSalary('');
            setPassword('');
            setImageURI(null);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
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
            <ScrollView>
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
                            <Text style={styles.inputTitle}>Department</Text>
                            <View style={styles.inputContainer}>
                                <Icon name='person-sharp' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                                <TextInput style={{ width: width * 0.83, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Department' value={department} onChangeText={value => setDepartment(value)} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputTitle}>Mobile</Text>
                            <View style={styles.inputContainer}>
                                <Icon name='at-sharp' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                                <TextInput keyboardType='number-pad' style={{ width: width * 0.83, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Mobile' value={mobile} onChangeText={value => setMobile(value)} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputTitle}>Salary</Text>
                            <View style={styles.inputContainer}>
                                <Icon name='at-sharp' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                                <TextInput keyboardType='number-pad' style={{ width: width * 0.83, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Salary' value={salary} onChangeText={value => setSalary(value)} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputTitle}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Icon name='lock-closed' padding={8} size={20} color={theme.text} style={{ borderRadius: 8 }} />
                                <TextInput style={{ width: width * 0.75, color: theme.text, borderRadius: 8 }} placeholderTextColor={"#b0b0b0"} placeholder='Password' secureTextEntry={hidePassword} value={password} onChangeText={value => setPassword(value)} />
                                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                    {hidePassword ? <Icon name='eye' padding={8} size={20} color={theme.text} />
                                        :
                                        <Icon name='eye-outline' padding={8} size={20} color={theme.text} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.inputTitle}>Upload Image</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', gap: 40 }}>
                                <TouchableOpacity
                                    onPress={selectImage}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        paddingHorizontal: 30,
                                        paddingVertical: 8,
                                        borderRadius: 10,
                                        borderWidth: 1.5,
                                        borderColor: '#5e5e5e',
                                    }}>
                                    <Icon name='images' size={30} color={theme.text} />
                                    <Text>{imageURI ? 'Image Selected' : 'Select Image'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={takePhoto}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        paddingHorizontal: 30,
                                        paddingVertical: 8,
                                        borderRadius: 10,
                                        borderWidth: 1.5,
                                        borderColor: '#5e5e5e',
                                    }}>
                                    <Icon name='camera' size={30} color={theme.text} />
                                    <Text>{imageURI ? 'Image Clicked' : 'Take Photo'}</Text>
                                </TouchableOpacity>
                            </View>
                            {imageURI && (
                                <Image source={{ uri: imageURI }} style={{ width: 100, height: 100, marginTop: 10 }} />
                            )}
                        </View>
                        <TouchableOpacity style={styles.insertBtn} onPress={handleInsert}>
                            <Text style={styles.insertBtnText}>
                                Insert
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default InsertEmployeeScreen;

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
        marginTop: 28,
        padding: 8,
        gap: 30,
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
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e',
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
        color: theme.text
    }
});
