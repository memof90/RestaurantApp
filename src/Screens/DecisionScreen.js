import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function DesicionScreens() {
        return (  
          //   <View style={styles.settingScreen}>
          //   <Text>hola desde DesicionScreen</Text>
          // </View>
          <View style={{flex:1}}>
            <View style={{flex:5, backgroundColor: "red"}}/>
            <View style={{flex:2, backgroundColor: "green"}}/>
            <View style={{flex:3, backgroundColor: "blue"}}/>
          </View>
        );
    
}

const styles = StyleSheet.create({
    settingScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

})
 


