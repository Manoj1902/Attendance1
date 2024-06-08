import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { getDistance, getPreciseDistance } from 'geolib';
import { theme } from '../theme';

const StaffDashboard = () => {
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);
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
                // const { latitude, longitude } = position.coords;
                const latitude = position.coords.latitude.toFixed(3)
                const longitude = position.coords.longitude.toFixed(3)
                const location = { latitude, longitude };
                setLocation(location);
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
        formData.append('date', new Date().toISOString().split('T')[0]);
        formData.append('time', new Date().toLocaleTimeString());
        formData.append('location', `${location.latitude}, ${location.longitude}`);

        try {
            const response = await axios.post('http://192.168.137.1/api/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', response.data.message);
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <View>
                    <Image source={{ uri: imageUri }} style={styles.preview} />
                    <Text>Location: {location ? `${location.latitude}, ${location.longitude}` : 'Getting location...'}</Text>
                    <TouchableOpacity onPress={uploadImage} style={styles.button}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <RNCamera
                    ref={(ref) => setCameraRef(ref)}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    captureAudio={false}
                >
                    <View style={styles.captureContainer}>
                        <TouchableOpacity onPress={takePicture} style={styles.button}>
                            <Text style={styles.buttonText}>Capture Image</Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            )}
        </View>
    );
}

export default StaffDashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background
    },
    preview: {
        width: '100%',
        height: '80%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
})