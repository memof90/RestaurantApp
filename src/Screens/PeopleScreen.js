import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

class PeopleScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={styles.peopleScreen}>
            <Text>hola desde peopleScreen</Text>
          </View>
         );
    }
}

const styles = StyleSheet.create({
    peopleScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

})
 
export default PeopleScreens;