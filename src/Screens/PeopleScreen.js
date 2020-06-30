import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default function PeopleScreens () {
        return ( 
            <View style={styles.peopleScreen}>
            <Text>hola desde peopleScreen</Text>
          </View>
         );
    
}

const styles = StyleSheet.create({
    peopleScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

})
 