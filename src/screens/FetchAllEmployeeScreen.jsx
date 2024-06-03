import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { theme } from '../theme';

const FetchAllEmployeeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.137.1/api/fetch.php'); // replace with your local IP address   
            // console.log(response.data);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await axios.post('http://192.168.137.1/api/delete.php', {
                id: id
            });
            Alert.alert('Success', response.data.Message);
            fetchData(); // Refresh the list after deletion
        } catch (error) {
            // console.error('Error deleting item:', error);
            Alert.alert('Error', 'Error deleting item. Please try again.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
                <Text style={styles.name}>{item.Id}</Text>
                <View>
                    <Text style={styles.name}>{item.Name}</Text>
                    <Text style={styles.email}>{item.Email}</Text>
                    <Button title="Delete" onPress={() => deleteItem(item.Id)} />
                </View>

            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

export default FetchAllEmployeeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#555',
    },
    button: {
        marginLeft: 10,
        width: 80
    },
})