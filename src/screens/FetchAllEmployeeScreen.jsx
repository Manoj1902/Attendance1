import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const FetchAllEmployeeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.137.1/api/fetch.php');
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
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'Error deleting item. Please try again.');
        }
    };

    const editItem = (item) => {
        setCurrentItem(item);
        setName(item.Name);
        setMobile(item.Mobile);
        setPassword(item.Password);
        setModalVisible(true);
    };

    const updateItem = async () => {
        try {
            const response = await axios.post('http://192.168.137.1/api/update.php', {
                Id: currentItem.Id,
                Name: name,
                Mobile: mobile,
                Password: password
            });
            Alert.alert('Success', response.data.Message);
            setModalVisible(false);
            fetchData(); // Refresh the list after update
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'Error updating item. Please try again.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EmployeeDetailScreen', { employee: item })}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
                <Text style={styles.name}>{item.Id}</Text>
                <View>
                    <Text style={styles.name}>{item.Name}</Text>
                    <Text style={styles.mobile}>{item.Mobile}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={() => editItem(item)} />
                    <Button title="Delete" onPress={() => deleteItem(item.Id)} />
                </View>
            </View>
        </TouchableOpacity>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile"
                        value={mobile}
                        onChangeText={setMobile}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Update" onPress={updateItem} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FetchAllEmployeeScreen;

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mobile: {
        fontSize: 16,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#0e0e0e',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: '100%',
    },
    button: {
        marginLeft: 10,
    },
});
