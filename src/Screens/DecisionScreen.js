import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function DesicionScreens() {
        return (  
            <View style={styles.settingScreen}>
            <Text>hola desde DesicionScreen</Text>
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
 


