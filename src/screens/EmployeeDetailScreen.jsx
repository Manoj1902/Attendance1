import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../theme';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { version } from '../../package.json'
import Icon from 'react-native-vector-icons/Ionicons';



const { width, height } = Dimensions.get('window');
const EmployeeDetailScreen = ({ route, navigation }) => {
    const { employee } = route.params;
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [locationNames, setLocationNames] = useState({});

    useEffect(() => {
        fetchAttendance();
    }, [selectedDate]);

    const fetchAttendance = async () => {
        try {
            const month = selectedDate.getMonth() + 1;
            const year = selectedDate.getFullYear();
            const response = await axios.post('http://192.168.137.1/api/fetch_attendance.php', {
                Mobile: employee.Mobile,
                Month: month,
                Year: year
            });
            setAttendanceDetails(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowPicker(false);
        setSelectedDate(currentDate);
    };






    // console.log('Employee Image URL:', employee.Image); // Log the image URL for debugging.


    const appVersion = () => {
        ToastAndroid.showWithGravity(
            version,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor={theme.background} />
            <SafeAreaView >


                {/* Header */}
                <View style={styles.header}>

                    <TouchableOpacity style={styles.iconBackButton} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={34} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Admin Login</Text>

                    <TouchableOpacity style={styles.iconButton} onPress={() => appVersion()}>
                        <Icon name="information-circle" size={35} color="white" />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>



            {employee.Image ? (
                <Image source={{ uri: employee.Image }} style={styles.image} />
            ) : (
                <Text>No Image Available</Text>
            )}
            <Text style={styles.nameLabel}>{employee.Name}</Text>
            <View style={styles.employeeDetailsContainer}>
                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="phone-portrait" size={25} color="white" />
                    <Text style={styles.label}>{employee.Mobile}</Text>
                </View>
                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="wallet" size={26} color="white" />
                    <Text style={styles.label}>{employee.Salary}</Text>
                </View>
                <View style={styles.employeeDetails}>
                    <Icon style={{ width: 35, height: 35, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} name="lock-closed" size={26} color="white" />
                    <Text style={styles.label}>{employee.Password}</Text>
                </View>
            </View>

            <View style={styles.attendanceContainer}>
                <Text style={styles.attendanceTitle}>Monthly Attendance</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>Select Month and Year</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <View style={styles.attendanceItem}>
                    <Text style={styles.attendanceText}>Date</Text>
                    <Text style={styles.attendanceText}>Time</Text>
                    {/* <Text style={styles.attendanceText}>Location</Text> */}
                    <Text style={styles.attendanceText}>Status</Text>
                </View>

                {attendanceDetails.length > 0 ? (
                    attendanceDetails.map((attendance, index) => (
                        <View key={index} style={styles.attendanceItem}>
                            <Text style={styles.attendanceText}>{attendance.Attendance_date}</Text>
                            <Text style={styles.attendanceText}>{attendance.Attendance_time}</Text>
                            {/* <Text style={styles.attendanceText}>{attendance.Location}</Text> */}
                            <Text style={styles.attendanceText}>{attendance.attendance}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No attendance records available</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        backgroundColor: theme.background,
        alignItems: 'center',
    },
    header: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 12
    },
    iconBackButton: {
        backgroundColor: theme.themeColor,
        padding: 4,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text
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
    },
    nameLabel: {
        fontSize: 28,
        marginBottom: 10,
        color: theme.text,
        fontWeight: 'bold'
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
    },
    attendanceContainer: {
        backgroundColor: '#3F4056',
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        width: width * 0.9,
        alignItems: 'center',
    },
    attendanceTitle: {
        fontSize: 24,
        color: theme.text,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    attendanceItem: {
        backgroundColor: '#4F5068',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    attendanceText: {
        fontSize: 16,
        color: theme.text,
        marginBottom: 5
    },
    dateButton: {
        backgroundColor: '#4F5068',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    dateButtonText: {
        color: theme.text,
        fontSize: 16,
    },
});

export default EmployeeDetailScreen;
