import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';


export default function RestaurantScreens () {
        return (  
            <View style={styles.homeScreen}>
                <Text>hola desde RestaurantScreens</Text>
            </View>
        );
    
}

const styles = StyleSheet.create({
    homeScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

})
 