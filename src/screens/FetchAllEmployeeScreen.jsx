import { Alert, Button, Dimensions, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

var { width, height } = Dimensions.get('window');

const FetchAllEmployeeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://attendance.mobitechllp.com/fetch.php');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        Alert.alert('Delete Employee!', 'Are you sure to delete the employee account from database', [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        const response = await axios.post('http://attendance.mobitechllp.com/delete.php', { id });
                        Alert.alert('Success', response.data.Message);
                        fetchData();
                    } catch (error) {
                        Alert.alert('Error', 'Error deleting item. Please check network.');
                    }
                }
            },
        ]);
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
            const response = await axios.post('http://attendance.mobitechllp.com/update.php', {
                Id: currentItem.Id,
                Name: name,
                Mobile: mobile,
                Password: password
            });
            Alert.alert('Success', response.data.Message);
            setModalVisible(false);
            fetchData();
        } catch (error) {
            Alert.alert('Error', 'Error updating item. Please check network.');
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EmployeeDetailScreen', { employee: item })}
        >
            <View style={styles.itemRow}>
                <Image
                    source={{ uri: item.Image || 'http://attendance.mobitechllp.com/assets/user.png' }}
                    style={styles.image}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item.Name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => editItem(item)}
                        style={styles.editButton}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteItem(item.Id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={renderItem}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
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
                        secureTextEntry={false}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            onPress={updateItem}
                            style={styles.modalButton}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.modalButton}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
    },
    item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    editButton: {
        backgroundColor: theme.themeColor,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: theme.themeColor,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: theme.text,
        fontSize: 15,
    },
    searchBar: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: '#3a3a42',
        borderRadius: 15,
        fontSize: 16,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#494651',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 12,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    modalButton: {
        backgroundColor: theme.themeColor,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
});

export default FetchAllEmployeeScreen;
