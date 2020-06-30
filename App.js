import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// importaciones tab 
import RestaurantScreens from './src/Screens/RestaurantsScreen';
import PeopleScreens from './src/Screens/PeopleScreen';
import DesicionScreens from './src/Screens/DecisionScreen';

// // pantalla uno 
// function PeopleScreen() {
//   return (
      
//       <PeopleScreens />
//   )
// }

// // pantalla dos
// function DesicionScreen() {
//   return (
//      <DesicionScreens />
//   )
// }

// // pantalla tres 
// function  RestaurantScreen(){
//   return(
//    <RestaurantScreens />
//   )
// }

// router de pantallas 

const Tab = createBottomTabNavigator();

// function MyTabs(){
//   return(
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen  name="Settings" component={SettingScreen}/>
//     </Tab.Navigator>
//   )
// }

export default function App() {

  // saber si estamos en un dispositivo ios

  const platformOS = Platform.OS.toLowerCase();

  console.log(`RestaurantChooser starting on ${Platform.OS}`);

  return (
        
     <NavigationContainer>
     <Tab.Navigator 
       screenOptions={({route}) => ({
         tabBarIcon:({ focused, color, size}) => {
           let iconName;

           if (route.name === 'PeopleScreen'){
             iconName = focused ? 'ios-person' : 'ios-person-add';
           } else if (route.name === 'DesicionScreen') {
                iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline';
           } else if (route.name === 'RestaurantScreen'){
             iconName = focused ? 'md-cart' : 'md-restaurant';
           }

           // You can return any component that you like here!
           return <Ionicons name={iconName} size={size} color={color} />;
           
         },
       })}
       tabBarOptions={{
         activeTintColor: 'tomato',
         inactiveTintColor: 'gray'
       }}
       
     >
      <Tab.Screen name="PeopleScreen" component={PeopleScreens} />
      <Tab.Screen  name="DesicionScreen" component={DesicionScreens}/>
      <Tab.Screen  name="RestaurantScreen" component={RestaurantScreens}/>

     </Tab.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHomeScreenColor:{
  backgroundColor: 'tomato'
  },
  settingScreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantscreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
