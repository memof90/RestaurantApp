import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// pantalla uno 
function HomeScreen() {
  return (
    <View style={styles.homeScreen}>
      <Text>!Home</Text>
    </View>
  )
}

// pantalla dos
function SettingScreen() {
  return (
    <View style={styles.settingScreen}>
      <Text>!settings</Text>
    </View>
  )
}

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

           if (route.name === 'Home'){
             iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
           } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen  name="Settings" component={SettingScreen}/>

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
  settingScreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
