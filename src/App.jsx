import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import StaffLogin from './screens/StaffLogin';
import ForgotPasswrodScreen from './screens/ForgotPasswrodScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name='Admin' options={{ headerShown: false }} component={AdminLoginScreen} />
        <Stack.Screen name='Staff' options={{ headerShown: false }} component={StaffLogin} />
        <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPasswrodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})