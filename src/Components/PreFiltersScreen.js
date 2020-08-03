import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

// PreFiltersScreen) es la pantalla que ve el usuario después de seleccionar quién irá, 
// y les permite filtrar los restaurantes para su consideración

class PrefiltersScreen extends Component {
    constructor(props) {
        super(props);
        // Solo una llamada rápida al constructor de la superclase y la definición de un objeto de estado. 
        // Hay cuatro criterios según los cuales se puede filtrar un restaurante: tipo de cocina,
        //  precio (menor o igual que), 
        // calificación (mayor o igual que) y si tiene servicio de entrega.
        //  Esos valores están representados en el objeto de estado y, por supuesto,
        //  serán establecidos por los campos de entrada de datos a medida que el usuario los mute.
        this.state = { 
            cuisine : "",
            price : "",
            rating : "",
            delivery : ""
         }
    }
    render() { 
        return ( 
            <ScrollView style={styles.preFiltersContainer}>
            <View style={styles.preFiltersInnerContainer}>
              <View style={styles.preFiltersScreenFormContainer}>
      
                <View style={styles.preFiltersHeadlineContainer}>
                  <Text style={styles.preFiltersHeadline}>Pre-Filters</Text>
                </View>
      
                { /* ########## Cuisine ########## */ }
                <Text style={styles.fieldLabel}>Cuisine</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.cuisine}
                    prompt="Cuisine"
                    onValueChange={
                      (inItemValue) => this.setState({ cuisine : inItemValue })
                    }
                  >
                      <Picker.Item label="" value="" />
                      <Picker.Item label="Algerian" value="Algerian" />
                      <Picker.Item label="American" value="American" />
                      <Picker.Item label="BBQ" value="BBQ" />
                      <Picker.Item label="Belgian" value="Belgian" />
                      <Picker.Item label="Brazilian" value="Brazilian" />
                      <Picker.Item label="British" value="British" />
                      <Picker.Item label="Cajun" value="Cajun" />
                      <Picker.Item label="Canadian" value="Canadian" />
                      <Picker.Item label="Chinese" value="Chinese" />
                      <Picker.Item label="Cuban" value="Cuban" />
                      <Picker.Item label="Egyptian" value="Egyptian" />
                      <Picker.Item label="Filipino" value="Filipino" />
                      <Picker.Item label="French" value="French" />
                      <Picker.Item label="German" value="German" />
                      <Picker.Item label="Greek" value="Greek" />
                      <Picker.Item label="Haitian" value="Haitian" />
                      <Picker.Item label="Hawaiian" value="Hawaiian" />
                      <Picker.Item label="Indian" value="Indian" />
                      <Picker.Item label="Irish" value="Irish" />
                      <Picker.Item label="Italian" value="Italian" />
                      <Picker.Item label="Japanese" value="Japanese" />
                      <Picker.Item label="Jewish" value="Jewish" />
                      <Picker.Item label="Kenyan" value="Kenyan" />
                      <Picker.Item label="Korean" value="Korean" />
                      <Picker.Item label="Latvian" value="Latvian" />
                      <Picker.Item label="Libyan" value="Libyan" />
                      <Picker.Item label="Mediterranean" value="Mediterranean" />
                      <Picker.Item label="Mexican" value="Mexican" />
                      <Picker.Item label="Mormon" value="Mormon" />
                      <Picker.Item label="Nigerian" value="Nigerian" />
                      <Picker.Item label="Other" value="Other" />
                      <Picker.Item label="Peruvian" value="Peruvian" />
                      <Picker.Item label="Polish" value="Polish" />
                      <Picker.Item label="Portuguese" value="Portuguese" />
                      <Picker.Item label="Russian" value="Russian" />
                      <Picker.Item label="Salvadorian" value="Salvadorian" />
                      <Picker.Item label="Sandwiche Shop" value="Sandwiche Shop" />
                      <Picker.Item label="Scottish" value="Scottish" />
                      <Picker.Item label="Seafood" value="Seafood" />
                      <Picker.Item label="Spanish" value="Spanish" />
                      <Picker.Item label="Steak House" value="Steak House" />
                      <Picker.Item label="Sushi" value="Sushi" />
                      <Picker.Item label="Swedish" value="Swedish" />
                      <Picker.Item label="Tahitian" value="Tahitian" />
                      <Picker.Item label="Thai" value="Thai" />
                      <Picker.Item label="Tibetan" value="Tibetan" />
                      <Picker.Item label="Turkish" value="Turkish" />
                      <Picker.Item label="Welsh" value="Welsh" />
                  </Picker>
                </View>
      
                { /* ########## Price ########## */ }
                <Text style={styles.fieldLabel}>Price &lt;=</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.price}
                    prompt="price <="
                    onValueChange={
                      (inItemValue) => this.setState({ price : inItemValue })
                    }
                  >
                    <Picker.Item label="" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                  </Picker>
                </View>
      
                { /* ########## Rating ########## */ }
                <Text style={styles.fieldLabel}>Rating &gt;=</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.rating}
                    prompt="Rating >="
                    onValueChange={
                      (inItemValue) => this.setState({ rating : inItemValue })
                    }
                  >
                    <Picker.Item label="" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                  </Picker>
                </View>
      
                { /* ########## Delivery ########## */ }
                <Text style={styles.fieldLabel}>Delivery?</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    prompt="Delivery?"
                    selectedValue={this.state.delivery}
                    onValueChange={
                      (inItemValue) => this.setState({ delivery : inItemValue })
                    }
                  >
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                  </Picker>
                </View>
      
                { /* ########## Next Step button ########## */ }
                {/* El controlador onChange simplemente establece
                 el nuevo valor del selector en el objeto de estado */}

                 {/* El controlador onPress es donde está, por supuesto, 
                 y el trabajo allí comienza sacando la lista de restaurantes de AsyncStorage,
                  como has visto varias veces antes en varios lugares. 
                  Una vez que los tengamos en la matriz de inRestaurants, 
                  el siguiente paso es crear una matriz de restaurantes filtrada vacía. 
                  Recuerde que esta es una variable global para este módulo,
                   por lo que solo nos estamos asegurando de que sea una matriz vacía en este momento. 
                   (Realmente no debería haber ninguna forma de que no lo sea, 
                   pero una pequeña programación defensiva nunca hace daño a nadie). */}

                   {/* A continuación, iteramos la lista de restaurantes recuperados. 
                   Para cada uno, se establece el indicador passTests
                    a cierto, por lo que vamos a suponer, para empezar, 
                    que cada restaurante está incluido en la matriz final. Luego se realizan las pruebas,
                     según los criterios de filtro seleccionados, si los hay. 
                     En cada una se verifica si hay un espacio en blanco, 
                     lo que indica que el usuario no estableció un valor para un criterio dado, 
                     y para cualquiera que no esté en blanco, se ejecuta la lógica apropiada y 
                     passTests se establece en falso para cualquiera que falle. Al final, si passTests es verdadero, 
                     el restaurante se agrega a la matriz filterRestaurants */}
                    
                    {/* Finalmente, si después de esa iteración la matriz está vacía, 
                    le decimos al usuario que la aplicación no puede hacer nada y 
                    le advertimos que cambie los criterios de prefiltro. 
                    Si hay al menos uno, navegamos al usuario a la pantalla de Elección, 
                    que es el siguiente fragmento de código que debemos mirar.                     */}
                <CustomButton
                  text="Next"
                  width="94%"
                  onPress={ () => {
                    // Get all restaurants from LocalStorage.
                    AsyncStorage.getItem("restaurants",
                      function(inError, inRestaurants) {
                        if (inRestaurants === null) {
                          inRestaurants = [ ];
                        } else {
                          inRestaurants = JSON.parse(inRestaurants);
                        }
                        // Now filter them based on selected criteria, if any.
                        filteredRestaurants = [ ];
                        for (const restaurant of inRestaurants) {
                          let passTests = true;
                          // Filter on cuisine.
                          if (this.state.cuisine !== ""
                          ) {
                            if (Object.keys(this.state.cuisine).length > 0) {
                              if (restaurant.cuisine !== this.state.cuisine) {
                                passTests = false;
                              }
                            }
                          }
                          // Filter on price.
                          if (this.state.price !== "") {
                            if (restaurant.price > this.state.price) {
                              passTests = false;
                            }
                          }
                          // Filter on rating.
                          if (this.state.rating !== "") {
                            if (restaurant.rating < this.state.rating) {
                              passTests = false;
                            }
                          }
                          // Filter on delivery.
                          if (this.state.delivery !== "") {
                            if (restaurant.delivery !== this.state.delivery) {
                              passTests = false;
                            }
                          }
                          // The case where there are no selected criteria.
                          if (this.state.cuisine.length === 0 &&
                            this.state.price === "" && this.state.rating === "" &&
                            this.state.delivery === ""
                          ) {
                            passTests = true;
                          }
                          // Yep, this one meets the criteria, add it.
                          if (passTests) {
                            filteredRestaurants.push(restaurant);
                          }
                        }
                        // If there were no matches, we can't go on.
                        if (filteredRestaurants.length === 0) {
                          Alert.alert(
                            "Well, that's an easy choice",
                            "None of your restaurants match these criteria. Maybe " +
                            "try loosening them up a bit?",
                            [ { text : "OK" } ],
                            { cancelable : false }
                          );
                        } else {
                          // We've got at least one, go to the next screen.
                          this.props.navigation.navigate("ChoiceScreen");
                        }
                      }.bind(this)
                    );
                  } }
                />
              </View>
            </View>
          </ScrollView>
         );
    }
}

const styles = StyleSheet.create({


    // Tal como viste en la pantalla anterior, es necesario un poco de espacio 
    // en la parte superior para evitar la superposición con la barra de estado.
    //  Luego se anida una vista dentro de esa, con la cual Puede introducir algún diseño. 
    //  Si bien sería posible aplicar los estilos necesarios al ScrollView en sí, 
    //  hacerlo como elemento secundario del ScrollView nos brinda la oportunidad de 
    //  separar el estilo entre los dos, 
    //  dándonos un poco más de flexibilidad si alguna vez se ampliara esta pantalla.
    //  El estilo aplicado a esta vista secundaria también es bastante básico.
    preFiltersContainer : {
        marginTop : Constants.statusBarHeight
      },


    //   Con flex: 1, llenará su elemento primario y sus elementos secundarios se centrarán, 
    //   gracias a la configuración alignItems. Se agrega un poco más de relleno. Esto es necesario porque, 
    //   cuando el usuario se desplaza, el relleno en ScrollView se desplazará fuera de la vista y 
    //   los elementos se superpondrán a la barra de estado. Agregar relleno aquí asegura que eso no suceda. 
    //   Finalmente,dar a esta vista todo el ancho de la pantalla garantiza que tengamos el máximo 
    //   espacio disponible para trabajar para comenzar.
    
      preFiltersInnerContainer : {
        flex : 1,
        alignItems : "center",
        paddingTop : 20,
        width : "100%"
      },
    //   Dentro de esta Vista hay otra Vista, un contenedor para los controles de entrada de datos (nuestro "formulario" 
    //   prefiltro, por así decirlo). Esto se hace para que se pueda aplicar el siguiente estilo 
    //   para proporcionar relleno en ambos lados de la pantalla.
      preFiltersScreenFormContainer : {
        width : "96%"
      },
    //   Dentro de esta Vista de tercer nivel hay otra Vista, 
    //   que tiene un componente de Texto dentro de ella. 
    //   Esto le da a la pantalla un encabezado de título, 
    //   al igual que con la pantalla anterior

    // El estilo de la Vista es necesario porque, de forma predeterminada, su contenedor principal, 
    // diseñado con preFiltersScreenFormContainer, se alineará a la izquierda
    //  (recuerde, flex-start es el valor predeterminado), 
    // pero queremos que esté centrado, 
    // por lo que el componente de Texto se ajusta en una Vista y alineación central se le agrega. 
    // El componente de texto tiene el mismo estilo que el encabezado de la pantalla anterior.
      preFiltersHeadlineContainer : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
      },
    
      preFiltersHeadline : {
        fontSize : 30,
        marginTop : 20,
        marginBottom : 20
      },
    
// Esto sirve para colocar un poco de espacio a la izquierda, 
// de modo que la etiqueta se alinee con el borde del cuadro Selector,
//  tal como se vio en la pantalla Agregar restaurantes.
//  El selector en sí está vinculado al atributo de cocina en el objeto de estado 
//  y está envuelto en una vista con este estilo aplicado
      fieldLabel : {
        marginLeft : 10
      },
    
      pickerContainer : {
        ...Platform.select({
          ios : { },
          android : {
            width : "96%",
            borderRadius : 8,
            borderColor : "#c0c0c0",
            borderWidth : 2,
            marginLeft : 10,
            marginBottom : 20,
            marginTop : 4
          }
        })
      }

})

 
export default PrefiltersScreen;


