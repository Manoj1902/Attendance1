import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';

const EmployeeDetailScreen = ({ route }) => {
    const { employee } = route.params;

    return (
        <View style={styles.container}>
            {employee.Image && (
                <Image source={{ uri: employee.Image }} style={styles.image} />
            )}
            <Text style={styles.label}>Name: {employee.Name}</Text>
            <Text style={styles.label}>Mobile: {employee.Mobile}</Text>
            <Text style={styles.label}>Email: {employee.Email}</Text>
            {/* Add more employee details as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default EmployeeDetailScreen;
