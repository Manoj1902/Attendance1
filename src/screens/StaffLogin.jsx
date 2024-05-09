import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../theme'

const StaffLogin = () => {
    return (
        <View style={styles.container}>
            <Text>StaffLogin</Text>
        </View>
    )
}

export default StaffLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    }
})