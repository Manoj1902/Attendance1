import { theme } from '../theme';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';


var { width, height } = Dimensions.get('window')
const HomeScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cameraRef, setCameraRef] = useState(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude}, ${longitude}`);
            },
            (error) => {
                console.error(error);
                Alert.alert('Error', 'Unable to get location');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            setImageUri(data.uri);
            const currentDate = new Date();
            setDate(currentDate.toISOString().split('T')[0]);
            setTime(currentDate.toLocaleTimeString());
            getLocation();
        }
    };

    const uploadImage = async () => {
        if (!imageUri || !location) {
            Alert.alert('Error', 'Please capture an image and get location first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        formData.append('date', date);
        formData.append('time', time);
        formData.append('location', location);

        try {
            const response = await axios.post('http://192.168.137.1/api/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', response.data.message);
            openCameraScreen();

        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };

    const openCameraScreen = () => {
        setImageUri(null)
        setDate('')
        setTime('')
        setLocation(null)
        setCameraRef(null)
    }

    return (
        <View style={styles.container}>
            {imageUri ? (
                <View style={styles.capturedInfo}>
                    <View>
                        {/* <Text>Image</Text> */}
                        <Image
                            source={{ uri: imageUri }}
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                marginTop: 25,
                                borderWidth: 4,
                                borderColor: '#535C68'
                            }} />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text>Date: {date}</Text>
                        <Text>Time: {time}</Text>
                        <Text>Location: {location}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={uploadImage} style={styles.button}>
                            <Text style={styles.buttonText}>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCameraScreen} style={styles.button}>
                            <Text style={styles.buttonText}>Re-Take</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                    <RNCamera
                        ref={(ref) => setCameraRef(ref)}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.front}
                        captureAudio={false}
                    >
                        <TouchableOpacity onPress={takePicture} style={styles.button}>
                            {/* <Text style={styles.buttonText}>Capture Image</Text> */}
                        </TouchableOpacity>
                    </RNCamera>
                    <View style={styles.captureContainer}>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background
    },
    capturedInfo: {
        alignItems: 'center',
        gap: 10
    },
    preview: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    captureContainer: {
        flexDirection: 'column',
        marginTop: 25,
    },
    button: {
        width: 80,
        height: 80,
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 99999,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
});

export default HomeScreen;
