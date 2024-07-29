import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const StaffDashboard = ({ employee, navigation }) => {
    const { Name: employeeName, Mobile: employeeMobile } = employee;
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cameraRef, setCameraRef] = useState(null);
    const [showButtons, setShowButtons] = useState(true);
    const [countdown, setCountdown] = useState(10);

    useFocusEffect(
        React.useCallback(() => {
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

            requestLocationPermission();
        }, [])
    );

    useEffect(() => {
        let timer;
        if (!showButtons) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer);
                        setShowButtons(true);
                        return 10;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showButtons]);

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
            setShowButtons(false);
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
        formData.append('name', employeeName);
        formData.append('mobile', employeeMobile);
        formData.append('attendance', 'present');
        formData.append('attendance_date', date);
        formData.append('attendance_time', time);
        formData.append('location', location);

        try {
            const response = await axios.post('http://attendance.mobitechllp.com/upload.php', formData, {
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
        setImageUri(null);
        setDate('');
        setTime('');
        setLocation(null);
        setCameraRef(null);
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <View style={styles.capturedInfo}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text>Name: {employeeName}</Text>
                        <Text>Mobile: {employeeMobile}</Text>
                        <Text>Date: {date}</Text>
                        <Text>Time: {time}</Text>
                        <Text>Location: {location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {showButtons ? (
                            <>
                                <TouchableOpacity onPress={uploadImage} style={styles.button}>
                                    <Text style={styles.buttonText}>Upload Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={openCameraScreen} style={styles.button}>
                                    <Text style={styles.buttonText}>Re-Take</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text style={styles.countdownText}>{countdown}</Text>
                        )}
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
                        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                            {/* <Text style={styles.buttonText}>Capture</Text> */}
                        </TouchableOpacity>
                    </RNCamera>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.background
    },
    capturedInfo: {
        alignItems: 'center',
    },
    preview: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 25,
        borderWidth: 4,
        borderColor: '#535C68',
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    captureButton: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 9999,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    countdownText: {
        fontSize: 24,
        color: theme.text,
        alignSelf: 'center',
        marginTop: 10,
    },
});

export default StaffDashboard;
