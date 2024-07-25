import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../theme';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Icon from 'react-native-vector-icons/AntDesign';

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
        <View style={styles.container}>
            <SafeAreaView>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Admin Dashboard</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={handleLogout} disabled={logoutBtnDisabled}>
                        <Icon name="logout" size={30} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View style={styles.userInfo}>
                <Text style={styles.userInfoText}>Welcome,
                    <Text style={{ fontWeight: 'bold' }}> {adminName}</Text>
                </Text>
                <Text style={styles.userInfoText}>Email: {adminEmail}</Text>
            </View>

            <View style={styles.centered}>
                <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('InsertEmployee')}>
                    <Text style={styles.insertScreenBtnText}>Add Employee</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('ShowAllEmployee')}>
                    <Text style={styles.insertScreenBtnText}>Show All Employee</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.insertScreenBtn} onPress={() => navigation.navigate('AdminSignUp')}>
                    <Text style={styles.insertScreenBtnText}>Add New Admin</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        paddingVertical: 24,
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
    userInfo: {
        alignItems: 'center',
        marginVertical: 30,
    },
    userInfoText: {
        fontSize: 18,
        color: theme.text,
        marginBottom: 5,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    insertScreenBtn: {
        padding: 15,
        backgroundColor: theme.themeColor,
        marginTop: 20,
        marginHorizontal: 8,
        width: 200,
        borderRadius: 15,
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
});
