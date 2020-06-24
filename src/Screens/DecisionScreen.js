import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';



class DesicionScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <View style={styles.settingScreen}>
            <Text>hola desde DesicionScreen</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    settingScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

})
 
export default DesicionScreens;


