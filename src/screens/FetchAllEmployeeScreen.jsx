import { Alert, Button, Dimensions, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

var { width, height } = Dimensions.get('window')
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
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.error(error);
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
                text: 'OK', onPress: async () => {
                    try {
                        const response = await axios.post('http://attendance.mobitechllp.com/delete.php', {
                            id: id
                        });
                        Alert.alert('Success', response.data.Message);
                        fetchData(); // Refresh the list after deletion
                    } catch (error) {
                        console.error('Error deleting item:', error);
                        Alert.alert('Error', 'Error deleting item. Please try again.');
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
            fetchData(); // Refresh the list after update
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'Error updating item. Please try again.');
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EmployeeDetailScreen', { employee: item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                {
                    item.Image ?
                        <Image source={{ uri: item.Image }} style={styles.image} /> :
                        <Image source={require('../assets/user.png')} style={styles.image} />
                }
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.name}>{item.Name}</Text>
                    {/* <Text style={styles.mobile}>Mobile: {item.Mobile}</Text> */}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => editItem(item)}
                        style={{
                            backgroundColor: theme.themeColor,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderRadius: 8,
                        }}>
                        <Text style={{ color: theme.text, fontSize: 15 }}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => deleteItem(item.Id)}
                        style={{
                            backgroundColor: theme.themeColor,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderRadius: 8,
                        }}>
                        <Text style={{ color: theme.text, fontSize: 15 }}>Delete</Text>
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
                        secureTextEntry={false}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={updateItem}
                            style={{
                                backgroundColor: theme.themeColor,
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 8,
                            }}>
                            <Text style={{ color: theme.text, fontSize: 15 }}> Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}
                            style={{
                                backgroundColor: theme.themeColor,
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 8,
                            }}>
                            <Text style={{ color: theme.text, fontSize: 15 }}>Cancle</Text>
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
        marginVertical: 2.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#494651',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
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
        fontSize: 16
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default FetchAllEmployeeScreen;
