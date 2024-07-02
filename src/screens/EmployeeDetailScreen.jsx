import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');
const EmployeeDetailScreen = ({ route }) => {
    const { employee } = route.params;

    console.log('Employee Image URL:', employee.Image); // Log the image URL for debugging.  

    return (
        <View style={styles.container}>
            {employee.Image ? (
                <Image source={{ uri: employee.Image }} style={styles.image} />
            ) : (
                <Text>No Image Available</Text>
            )}
            <Text style={styles.label}>{employee.Name}</Text>
            <View style={styles.employeeDetailsContainer}>
                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="mobile-phone" size={30} color="white" />
                    <Text style={styles.label}>{employee.Mobile}</Text>
                </View>
                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="rupee" size={26} color="white" />
                    <Text style={styles.label}>{employee.Salary}</Text>
                </View>

                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="unlock-alt" size={26} color="white" />
                    <Text style={styles.label}>{employee.Password}</Text>
                </View>
            </View>

            {/* Add more employee details as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 9999,
        borderWidth: 4,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: theme.text
        // textAlign: 'center'
    },
    employeeDetailsContainer: {
        backgroundColor: '#3F4056',
        flexDirection: 'column',
        paddingVertical: 16,
        marginTop: 20,
        marginLeft: 18,
        marginRight: 18,
        borderRadius: 20,
        width: width * 0.9,
        padding: 18,
        gap: 10,
        alignItems: 'center'
    },
    employeeDetails: {
        alignItems: 'center',
        width: "100%",
        flexDirection: 'row',
        gap: 25,
    }
});

export default EmployeeDetailScreen;
