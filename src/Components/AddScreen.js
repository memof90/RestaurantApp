import React, { Component } from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { Root, Toast } from "native-base";



class AddScreen extends Component {
    constructor(props) {
        super(props);
        // Al igual que con la pantalla de lista, 
        // un constructor con una llamada al constructor de la superclase es el primero, 
        // seguido de la creación de un objeto de estado. Los atributos coinciden con los criterios que puede ingresar sobre un restaurante, 
        // excepto el atributo clave, que es una clave única que tendrá un restaurante agregado, que es solo un valor de marca de tiempo simple. 
        // Esa no es la forma más sólida de generar una clave única para un objeto,
        //  pero satisfará nuestras necesidades aquí perfectamente.
        this.state = { name : "", cuisine : "", price : "", rating : "",
        phone : "", address : "", webSite : "", delivery : "",
        key : `r_${new Date().getTime()}` 
    };
    }

//     En este punto, vale la pena señalar que este archivo RestaurantScreen.js que hemos estado viendo tiene dos componentes definidos (hasta ahora), 
//     uno para la pantalla de lista y ahora este para la pantalla de agregar. 
//     Esto, por supuesto, está bien, ya que puede crear tantas clases en un módulo 
//     (que es lo que es RestaurantScreen.js) como desee, pero solo se exportará una, y verá que después de que hayamos terminado con El código de esta pantalla.
//   Hablando de ese código, veamos el método render () 
//   a continuación, y al igual que con la pantalla de lista, te dejaré leerlo, y 
//   luego lo desglosaré (aunque por ahora, apuesto a que puedes resolverlo) esto casi solo)
    render() { 
        return ( 
            <ScrollView style={styles.addScreenContainer}>
              <View style={styles.addScreenInnerContainer}>
                  <View style={styles.addScreenFormContainer}>

                  </View>
              </View>
            </ScrollView>
         );
    }
}

const styles = StyleSheet.create({
    addScreenContainer : { 
        marginTop : Constants.statusBarHeight 
    },

    addScreenInnerContainer : { 
        flex : 1, 
        alignItems : "center", 
        paddingTop : 20, 
        width : "100%" 
    },
    addScreenFormContainer : { 
        width : "96%" 
    }
    

})
 
export default AddScreen;