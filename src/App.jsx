import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import StaffLogin from './screens/StaffLogin';
import ForgotPasswrodScreen from './screens/ForgotPasswrodScreen';
import AdminDashboard from './screens/AdminDashboard';
import StaffDashboard from './screens/StaffDashboard';
import SignUpAdminScreen from './screens/SignUpAdminScreen';
import useAuth from './hooks/useAuth';
import InsertEmployeeScreen from './screens/InsertEmployeeScreen';
import FetchAllEmployeeScreen from './screens/FetchAllEmployeeScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useAuth()

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AdminDashboard'>
          {/* <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} /> */}
          {/* <Stack.Screen name='Admin' options={{ headerShown: false }} component={AdminLoginScreen} /> */}
          {/* <Stack.Screen name='AdminSignUp' options={{ headerShown: false }} component={SignUpAdminScreen} /> */}
          {/* <Stack.Screen name='Staff' options={{ headerShown: false }} component={StaffLogin} /> */}
          {/* <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPasswrodScreen} /> */}
          <Stack.Screen name='AdminDashboard' options={{ headerShown: false }} component={AdminDashboard} />
          <Stack.Screen name='InsertEmployee' options={{ headerShown: false }} component={InsertEmployeeScreen} />
          <Stack.Screen name='ShowAllEmployee' options={{ headerShown: false }} component={FetchAllEmployeeScreen} />
          <Stack.Screen name='EmployeeDetailScreen' options={{ headerShown: false }} component={EmployeeDetailScreen} />
          <Stack.Screen name='AdminSignUp' options={{ headerShown: false }} component={SignUpAdminScreen} />
          {/* <Stack.Screen name='StaffDashboard' options={{ headerShown: false }} component={StaffDashboard} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name='Admin' options={{ headerShown: false }} component={AdminLoginScreen} />
          <Stack.Screen name='Staff' options={{ headerShown: false }} component={StaffLogin} />
          <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPasswrodScreen} />
          {/* <Stack.Screen name='AdminDashboard' options={{ headerShown: false }} component={AdminDashboard} /> */}
          <Stack.Screen name='StaffDashboard' options={{ headerShown: false }} component={StaffDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
