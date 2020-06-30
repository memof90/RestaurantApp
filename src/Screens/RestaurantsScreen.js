import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../Components/ListScreen';


export default function RestaurantScreens ({ navigation }) {
        return (  
            // <View style={styles.homeScreen}>
            //     <Text>hola desde RestaurantScreens</Text>
            //     <Button
            //     title="Go to DesicionScreens"
            //     onPress={() => navigation.navigate('PeopleScreen')}
            //    />
            // </View>
            <View>
                <ListScreen />
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
 