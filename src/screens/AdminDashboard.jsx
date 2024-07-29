import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../theme';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';

var { width, height } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
    const [logoutBtnDisabled, setLogoutBtnDisabled] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setAdminName(user.displayName || "Admin");
            setAdminEmail(user.email);
        }
    }, []);

    const handleLogout = async () => {
        setLogoutBtnDisabled(true);
        await signOut(auth);
        navigation.navigate('Admin');
        setLogoutBtnDisabled(false);
    };

    return (
        <>

            <View style={styles.container}>
                <SafeAreaView>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Admin Dashboard</Text>
                        <TouchableOpacity style={styles.iconButton} onPress={handleLogout} disabled={logoutBtnDisabled}>
                            <Icon name="log-out" size={30} color="white" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <View style={styles.loginImage}>
                    <Image source={{ uri: 'http://attendance.mobitechllp.com/assets/login.png' }}
                        style={styles.image} />
                </View>


                <View style={styles.card}>
                    <View style={styles.userInfo}>
                        <Text style={styles.userInfoText}>Welcome,
                            <Text style={{ fontWeight: 'bold' }}> {adminName}</Text>
                        </Text>
                        <Text style={styles.userInfoText}>Email: {adminEmail}</Text>
                    </View>
                    <View style={styles.centered}>
                        <View style={styles.buttonItem}>
                            <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('InsertEmployee')}>
                                <Icon name={'person-add-sharp'} size={35} color={'white'} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>Add New Employee</Text>
                            <Icon name={'arrow-forward'} size={20} color={theme.themeColor} style={{ textAlign: 'center' }} />
                        </View>

                        <View style={styles.buttonItem}>

                            <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('ShowAllEmployee')}>
                                {/* <Text style={styles.insertScreenBtnText}>Show All Employee</Text> */}
                                <Icon name={'people-sharp'} size={40} color={'white'} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>Show All Employees</Text>

                            <Icon name={'arrow-forward'} size={20} color={theme.themeColor} style={{ textAlign: 'center' }} />
                        </View>

                        <View style={styles.buttonItem}>
                            <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('AdminSignUp')}>
                                {/* <Text style={styles.insertScreenBtnText}>Add New Admin</Text> */}
                                <Icon name={'shield'} size={40} color={'white'} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>Add New Admin</Text>
                            <Icon name={'arrow-forward'} size={20} color={theme.themeColor} style={{ textAlign: 'center' }} />

                        </View>
                        <View style={styles.buttonItem}>
                            <TouchableOpacity style={styles.insertScreenBtn} onPress={handleLogout}>
                                {/* <Text style={styles.insertScreenBtnText}>Add New Admin</Text> */}
                                <Icon name={'power'} size={40} color={'white'} style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>Logout</Text>

                        </View>
                    </View>
                </View>
                <View style={styles.versionContainer}>
                    <View style={{
                        alignSelf: 'center',
                        backgroundColor: '#d6d6d6',
                        padding: 6,
                        borderRadius: 6
                    }}>
                        <Text style={styles.versiontext}>Version: {version}</Text>
                    </View>
                </View>
            </View >
        </>
    );
};

export default AdminDashboard;

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
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: theme.themeColor,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 12
    },
    iconButton: {
        padding: 10,
    },
    icon: {
        paddingHorizontal: 10,
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
    userInfo: {
        alignItems: 'center',
        marginVertical: 30,
    },
    userInfoText: {
        fontSize: 18,
        color: theme.blackText,
        marginBottom: 5,
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
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap'
    },
    buttonItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // backgroundColor: 'red',
        borderRadius: 20,
        padding: 12,
        gap: 10
    },
    buttonText: {
        color: theme.blackText,
        width: 80,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    insertScreenBtn: {
        width: 80,
        height: 80,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.themeColor,
        marginTop: 20,
        marginHorizontal: 8,
        borderRadius: 9999,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    insertScreenBtnText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    versionContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10
    },
    versiontext: {
        color: '#828282'
    }

});
