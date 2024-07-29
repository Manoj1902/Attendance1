import {
    Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid,
    TouchableOpacity, View, Image, ScrollView
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { theme } from '../theme';
import { version } from '../../package.json';

const { width } = Dimensions.get('window');

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
                // User cancelled image picker
            } else if (response.error) {
                Alert.alert('Error', `ImagePicker Error: ${response.error}`);
            } else {
                const source = response.assets[0].base64;
                setImageURI(`data:image/jpeg;base64,${source}`);
            }
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.didCancel) {
                // User cancelled camera
            } else if (response.error) {
                Alert.alert('Error', `Camera Error: ${response.error}`);
            } else {
                const source = response.assets[0].base64;
                setImageURI(`data:image/jpeg;base64,${source}`);
            }
        });
    };

    const handleInsert = () => {
        const uName = `${name} (${department})`;
        const uMobile = mobile;
        const uSalary = salary;
        const uPassword = password;

        if (!uName || !uMobile || !uSalary || !uPassword || !imageURI) {
            Alert.alert("Required Field is Missing");
        } else {
            const InsertURL = 'http://attendance.mobitechllp.com/insert.php';

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const Data = {
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
                .then((response) => response.text())
                .then((responseText) => {
                    try {
                        const responseJson = JSON.parse(responseText);
                        Alert.alert(responseJson[0].Message);
                    } catch (e) {
                        Alert.alert(`Error parsing response: ${e.message}`);
                    }
                })
                .catch((error) => {
                    Alert.alert(`Error: ${error}`);
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
                    <Text style={styles.headerText}>Add New Employee</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView>
                <View style={styles.input}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='person-sharp' size={20} color={theme.text} style={styles.iconStyle} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor="#b0b0b0"
                                placeholder='Name'
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Department</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='podium' size={20} color={theme.text} style={styles.iconStyle} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor="#b0b0b0"
                                placeholder='Department'
                                value={department}
                                onChangeText={setDepartment}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Mobile</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='phone-portrait' size={20} color={theme.text} style={styles.iconStyle} />
                            <TextInput
                                keyboardType='number-pad'
                                style={styles.textInput}
                                placeholderTextColor="#b0b0b0"
                                placeholder='Mobile'
                                value={mobile}
                                onChangeText={setMobile}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Salary</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='wallet' size={20} color={theme.text} style={styles.iconStyle} />
                            <TextInput
                                keyboardType='number-pad'
                                style={styles.textInput}
                                placeholderTextColor="#b0b0b0"
                                placeholder='Salary'
                                value={salary}
                                onChangeText={setSalary}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Icon name='lock-closed' size={20} color={theme.text} style={styles.iconStyle} />
                            <TextInput
                                style={styles.passwordInput}
                                placeholderTextColor="#b0b0b0"
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}
                                style={{
                                    padding: 8,
                                    borderRadius: 8,
                                }}>
                                <Icon name={hidePassword ? 'eye' : 'eye-outline'} size={20} color={theme.text}
                                    style={styles.iconStyle} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.uploadContainer}>
                        <Text style={styles.inputTitle}>Upload Image</Text>
                        <View style={styles.uploadButtons}>
                            <TouchableOpacity
                                onPress={selectImage}
                                style={styles.uploadButton}>
                                <Icon name='images' size={30} color={theme.text} />
                                <Text>{imageURI ? 'Image Selected' : 'Select Image'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={takePhoto}
                                style={styles.uploadButton}>
                                <Icon name='camera' size={30} color={theme.text} />
                                <Text>{imageURI ? 'Image Clicked' : 'Take Photo'}</Text>
                            </TouchableOpacity>
                        </View>
                        {imageURI && (
                            <Image source={{ uri: imageURI }} style={styles.imagePreview} />
                        )}
                    </View>
                    <TouchableOpacity style={styles.insertBtn} onPress={handleInsert}>
                        <Text style={styles.insertBtnText}>Insert</Text>
                    </TouchableOpacity>
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
        // height: height * 0.07,
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
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
    input: {
        marginTop: 20,
        paddingHorizontal: 20,
        gap: 30,
    },
    inputTitle: {
        paddingHorizontal: 8,
        marginBottom: 4,
        color: theme.text,
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5e5e5e',
    },
    textInput: {
        width: width * 0.83,
        color: theme.text,
        borderRadius: 8,
    },
    passwordInput: {
        width: width * 0.75,
        color: theme.text,
        borderRadius: 8,

    },
    iconStyle: {
        padding: 8,
        borderRadius: 8,
    },
    uploadContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButtons: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
    uploadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 10,
        borderColor: '#5e5e5e',
    },
    imagePreview: {
        width: 120,
        height: 120,
        marginTop: 10,
        borderRadius: 20
    },
    insertBtn: {
        padding: 10,
        backgroundColor: theme.themeColor,
        width: 155,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    insertBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
    },
});
