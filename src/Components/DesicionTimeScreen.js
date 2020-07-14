import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import { Constants } from "expo";
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

// No utilizaremos el componente CustomTextInput en ningún lugar aquí, pero lo haremos
// usar CustomButton, así que eso se importa. Todos los componentes React Native son los que ya has visto de una forma u otra, por lo que debes reconocerlos en este momento. El StackNavigator de React Navigation que viste en la pantalla de Restaurantes
// así es como vamos a pasar de una pantalla a otra. El componente CheckBox de NativeBase se importa a continuación, y este componente se usará en la pantalla Quién va, para elegir a las personas que saldrán a comer. Finalmente, las constantes de la Expo se utilizarán de manera similar a como era antes, es decir, para obtener información del tamaño del encabezado, de modo que se pueda agregar algo de relleno, cuando corresponda, como verá más adelante.


// Después de las importaciones, tenemos tres variables que serán necesarias en este archivo fuente. Son, por supuesto, globales dentro de este módulo, 
// lo que significa que todo el código de la pantalla secundaria podrá acceder a ellos, razón por la cual se definen aquí. 
// Cuando tiene que compartir datos entre datos en un solo módulo, esta es una excelente manera de hacerlo.


/* codigo completo apartir de aqui*/


// La variable participantes contendrá una serie de objetos, uno para cada persona que participará en la decisión. 
// La variable filtradoRestaurantes será una matriz de objetos, uno para cada restaurante que la aplicación podría elegir al azar. 
// Como su nombre lo indica, esta lista consistirá solo de restaurantes que pasen cualquier elección de prefiltro realizada
// por el usuario Finalmente, elegidoRestaurante es exactamente eso: un objeto con datos sobre el restaurante que se elige al azar.


/**
 * The list of people who are participating.
 */
let participants = null;


/**
 * The list of FILTERED restaurants from which the app will choose.
 */
let filteredRestaurants = null;


/**
 * The restaurant that is ultimately chosen.
 */
let chosenRestaurant = { };



// cambiar codigo a carpeta utils


// Hay un bit más de código antes de llegar a las pantallas, 
// y esa es una pequeña función auxiliar para elegir un número aleatorio.

// Es bastante repetitivo: solo un generador de números aleatorios típico que acepta un valor mínimo y un valor máximo y 
// devuelve un número aleatorio dentro de ese rango (inclusive). Debido a que potencialmente deberá llamarse más tarde varias veces dentro de un bucle,
//  tiene sentido extraer el código en una función como esta.
// Ahora, a las pantallas!

/**
 * Helper function to get a random number in a defined range.
 */
const getRandom = (inMin, inMax) => {
  inMin = Math.ceil(inMin);
  inMax = Math.floor(inMax);
  return Math.floor(Math.random() * (inMax - inMin + 1)) + inMin;
};

/**
 * #############################################################################
 * Decision Time screen.
 * #############################################################################
 */

 class DecisionTimeScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {  }
   }
   render() { 
     return (  
       <View style={styles.decisionTimeScreenContainer}>
          <TouchableOpacity style={styles.decisionTimeScreenTouchable}
          onPress={()=> {
                // Asegúrate de que haya gente.
                AsyncStorage.getItem("people", 
                function(inError, inPeople){
                  if(inPeople === null) {
                    inPeople = [ ];
                  }else{
                    inPeople = JSON.parse(inPeople);
                  }
                  if(inPeople.length === 0){
                    Alert.alert(
                      "That ain't work,chief",
                      "you haven't added any people." +
                      "you should probably do that first, no?",
                      [{text:"OK"}],
                      {cancelable: false}
                    );
                  }else{
                    // Ok, hay gente, ahora asegúrate de que haya restaurantes.
                    AsyncStorage.getItem("restaurants",
                      function(inError, inRestaurants){
                        if(inRestaurants === null) {
                          inRestaurants = [ ];
                        } else {
                          inRestaurants = JSON.parse(inRestaurants);
                        }
                        if(inRestaurants.length === 0) {
                          Alert.alert(
                            "That ain't gonna work, chief",
                            "You haven't added any restaurants. " +
                            "You should probably do that first, no?",
                            [ { text : "OK" } ],
                            { cancelable : false }
                          );
                        } else {
                          this.props.navigation.navigate("WhosGoingScreen");
                        }
                      }.bind(this)
                    );
                  }
                }.bind(this)
             );
          }}
          >
            <Image source={require("../images/its-decision-time.android.png")}/>
            <Text style={{padding:20}}>(Click the food to get going)</Text>
          </TouchableOpacity>
       </View>
     );
   }
 }


 /**
 * #############################################################################
 * Styles.
 * #############################################################################
 */

const styles = StyleSheet.create({
  
    decisionTimeScreenContainer : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center"
    },
  
    decisionTimeScreenTouchable : {
      alignItems : "center",
      justifyContent : "center"
    },
  
  })
  
 export default DecisionTimeScreen;