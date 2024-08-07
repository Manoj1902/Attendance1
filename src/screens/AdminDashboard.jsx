import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../theme';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json';

const { width, height } = Dimensions.get('window');

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Admin Dashboard</Text>
                <TouchableOpacity style={styles.iconButton} onPress={handleLogout} disabled={logoutBtnDisabled}>
                    <Icon name="log-out" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.loginImage}>
                <Image source={require('../assets/login.png')} style={styles.image} />
            </View>

            <View style={styles.card}>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Welcome,<Text style={styles.boldText}> {adminName}</Text></Text>
                    <Text style={styles.userInfoText}>Email: {adminEmail}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {[
                        { name: 'person-add-sharp', label: 'Add New Employee', route: 'InsertEmployee' },
                        { name: 'people-sharp', label: 'Show All Employees', route: 'ShowAllEmployee' },
                        { name: 'shield', label: 'Add New Admin', route: 'AdminSignUp' },
                        { name: 'power', label: 'Logout', action: handleLogout }
                    ].map(({ name, label, route, action }, index) => (
                        <View key={index} style={styles.buttonItem}>
                            <TouchableOpacity style={styles.insertScreenBtn} onPress={action || (() => navigation.navigate(route))}>
                                <Icon name={name} size={40} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.buttonText}>{label}</Text>
                            <Icon name="arrow-forward" size={20} color={theme.themeColor} />
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.versionContainer}>
                <View style={styles.versionBadge}>
                    <Text style={styles.versionText}>Version: {version}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: theme.themeColor,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    userInfo: {
        alignItems: 'center',
        marginVertical: 30,
    },
    userInfoText: {
        fontSize: 18,
        color: theme.blackText,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    buttonItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        padding: 12,
        gap: 10,
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
        margin: 8,
        borderRadius: 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    versionContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
    },
    versionBadge: {
        alignSelf: 'center',
        backgroundColor: '#d6d6d6',
        padding: 6,
        borderRadius: 6,
    },
    versionText: {
        color: '#828282',
    },
});

export default AdminDashboard;
