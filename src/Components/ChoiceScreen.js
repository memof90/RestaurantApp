import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

//importar utils get random 
import getRandom from '../utils/getRandomNumber';

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



// create a component
class ChoiceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            // Lista de participantes:la lista de personas que participan en la decisión. 
            // Esto se utiliza para enumerar las personas en la pantalla principal 
            // (la parte que no está en un modo modal) e indicar si alguien ha ejercido un veto
            participantsList : participants,
            // playersListRefresh: Actualiza la lista de personas despues de voto 
            participantsListRefresh : false,
            // selectedVisible: un booleano que le dice a React Native si el Modal que muestra el restaurante elegido es visible.
            selectedVisible : false,
            // vetoVisible: un booleano que, como selectedVisible, le dice a React Native 
            // si el modo en el que el usuario selecciona a la persona que vetó es visible o no.
            vetoVisible : false,
            // vetoDisabled: un booleano que determina si el botón Veto en el restaurante Modal
            //  elegido está deshabilitado o no.
            //  (Si no queda nadie que pueda vetar, debería deshabilitarse).
            vetoDisabled : false,
            // vetoText: contiene el texto para el botón Veto, que se cambiará a "No quedan vetos" 
            // cuando no quede nadie que pueda vetar. (Esto es mejor que simplemente deshabilitar el botón, porque de esta manera, 
            //     el usuario no se pregunta por qué está deshabilitado).
            vetoText : "Veto"
         }
    }
    render() {
        return (
            <View style={styles.listScreenContainer}>

            { /* ########## Selected Modal ########## */ }

            {/* El PresentationStyle Prop se utiliza para controlar cómo aparece el modal. 
            En su mayor parte, esto solo tendrá un efecto tangible en dispositivos más grandes, 
            como iPads, porque, en otros, aparecerá en pantalla completa, independientemente de la configuración 
            (o con solo una sutil diferencia visual). La configuración de formSheet es una de las cuatro que muestra el modal como una
             vista de ancho estrecho centrada en la pantalla */}
            <Modal
              presentationStyle={"formSheet"}
              visible={this.state.selectedVisible}
                // El atributo animationType determina qué tipo de animación se usa para mostrar el modal. 
                // Un valor de slide hace que el Modal se deslice desde la parte inferior 
                // (un valor de fade hace que se desvanezca a la vista, y 
                // un valor de none hace que aparezca sin animación, y este es el valor predeterminado).
              animationType={"slide"}
              onRequestClose={ () => { } }
            >
              <View style={styles.selectedContainer}>
                <View style={styles.selectedInnerContainer}>
                  <Text style={styles.selectedName}>{chosenRestaurant.name}</Text>
                  <View style={styles.selectedDetails}>
                    <Text style={styles.selectedDetailsLine}>
                    {/* Primero, puede ver que puede usar códigos de caracteres Unicode dentro de cadenas, como
                    He terminado, para mostrar un personaje estrella. Debido a que las cadenas en JavaScript tienen un método repeat (), 
                    lo uso para mostrar el número apropiado de caracteres de estrella, según el atributo elegidoRestaurant.rating. 
                    El tercer componente de texto hace algo similar para el precio del restaurante, pero no hay necesidad de valores Unicode aquí, 
                    porque un signo de dólar está fácilmente disponible (aunque, si esta aplicación se internacionalizara correctamente, 
                    podríamos usar Unicode para mostrar el símbolo de denominación apropiado para el país en el que se encuentra el dispositivo).
                     El cuarto componente de texto incluye un poco de lógica ternaria, para mostrar HACE o NO entrega, 
                     según lo determinado por el valor del restaurante elegido. atributo de entrega. */}
                      This is a {"\u2605".repeat(chosenRestaurant.rating)} star
                    </Text>
                    <Text style={styles.selectedDetailsLine}>
                      {chosenRestaurant.cuisine} restaurant
                    </Text>
                    <Text style={styles.selectedDetailsLine}>
                      with a price rating of {"$".repeat(chosenRestaurant.price)}
                    </Text>
                    <Text style={styles.selectedDetailsLine}>
                      that {chosenRestaurant.delivery === "Yes" ? "DOES" : "DOES NOT"} deliver.
                    </Text>
                  </View>
                  <CustomButton
                    text="Accept"
                    width="94%"
                    onPress={ () => {
                      this.setState({ selectedVisible : false, vetoVisible : false });
                      this.props.navigation.navigate("PostChoiceScreen");
                    } }
                  />
                  <CustomButton
                    text={this.state.vetoText}
                    width="94%"
                    disabled={this.state.vetoDisabled ? "true" : "false"}
                    onPress={ () => {
                      this.setState({ selectedVisible : false, vetoVisible : true });
                    } }
                  />
                </View>
              </View>
            </Modal>
      
            { /* ########## Veto Modal ########## */ }
            <Modal
              presentationStyle={"formSheet"}
              visible={this.state.vetoVisible}
              animationType={"slide"}
              onRequestClose={ () => { } }
            >
              <View style={styles.vetoContainer}>
                <View style={styles.vetoContainerInner}>
                  <Text style={styles.vetoHeadline}>Who's vetoing?</Text>
                  <ScrollView style={styles.vetoScrollViewContainer}>
                    { participants.map((inValue) => {
                        if (inValue.vetoed === "no") {
                          return <TouchableOpacity key={inValue.key}
                            style={ styles.vetoParticipantContainer }
                            onPress={ () => {
                              // Mark the vetoer as having vetoed.
                              for (const participant of participants) {
                                if (participant.key === inValue.key) {
                                  participant.vetoed = "yes";
                                  break;
                                }
                              }
                              // Make sure there's still at least one person that
                              // can veto, otherwise disable the Veto button.
                              let vetoStillAvailable = false;
                              let buttonLabel = "No Vetoes Left";
                              for (const participant of participants) {
                                if (participant.vetoed === "no") {
                                  vetoStillAvailable = true;
                                  buttonLabel = "Veto";
                                  break;
                                }
                              }
                              // Delete the vetoed restaurant.
                              for (let i = 0; i < filteredRestaurants.length; i++) {
                                if (filteredRestaurants[i].key === chosenRestaurant.key) {
                                  filteredRestaurants.splice(i, 1);
                                  break;
                                }
                              }
                              // Update state.
                              this.setState({
                                selectedVisible : false,
                                vetoVisible : false,
                                vetoText : buttonLabel,
                                vetoDisabled : !vetoStillAvailable,
                                participantsListRefresh : !this.state.participantsListRefresh
                              });
                              // If there's only one restaurant left then
                              // that's the choice.
                              if (filteredRestaurants.length === 1) {
                                this.props.navigation.navigate("PostChoiceScreen");
                              }
                            } }
                          >
                            <Text style={styles.vetoParticipantName}>
                              {inValue.firstName + " " + inValue.lastName}
                            </Text>
                          </TouchableOpacity>;
                        }
                      })
                    }
                  </ScrollView>
                  <View style={styles.vetoButtonContainer}>
                    <CustomButton
                      text="Never Mind"
                      width="94%"
                      onPress={ () => {
                        this.setState({
                          selectedVisible : true, vetoVisible : false
                        });
                      } }
                    />
                  </View>
                </View>
              </View>
            </Modal>
      
            { /* ########## Main choice screen. ########## */ }
            <Text style={styles.choiceScreenHeadline}>Choice Screen</Text>
            <FlatList
              style={styles.choiceScreenListContainer}
              data={this.state.participantsList}
              extraData={this.state.participantsListRefresh}
              renderItem={ ({item}) =>
                <View style={styles.choiceScreenListItem}>
                  <Text style={styles.choiceScreenListItemName}>
                    {item.firstName} {item.lastName} ({item.relationship})
                  </Text>
                  <Text>Vetoed: {item.vetoed}</Text>
                </View>
              }
            />
            <CustomButton
              text="Randomly Choose"
              width="94%"
              onPress={ () => {
                // Randomly pick one.
                const selectedNumber = getRandom(0, filteredRestaurants.length - 1);
                // Get the restaurant descriptor.
                chosenRestaurant = filteredRestaurants[selectedNumber];
                // Show the selected modal
                this.setState({ selectedVisible : true });
              } }
            />
      
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    // Va a llenar el modal y centrar a sus hijos, horizontalmente. 
    // El eje de diseño primario es vertical, porque el diseño predeterminado es la columna, 
    // recuerde. Dentro de esta Vista de nivel superior hay otra Vista, 
    // y aquí aplicamos un estilo para centrar a los niños verticalmente.
    selectedContainer: {
        flex : 1,
        justifyContent : "center"
      },
    
      selectedInnerContainer: {
        alignItems : "center"
      },
    
      selectedName : {
        fontSize : 32
      },

    //   Esto garantiza que haya una buena cantidad de espacio encima y
    //    debajo de los detalles del restaurante, que son los elementos centrales de esta Vista. 
    //    Cada línea de esos detalles es un componente de texto separado,
    //     y porque quería que el texto fuera más grande de lo habitual, 
    //    pero no tan grande como el nombre del restaurante

      selectedDetails : {
        paddingTop : 80,
        paddingBottom : 80,
        alignItems : "center"
      },
    
      selectedDetailsLine : {
        fontSize : 18
      },
    
      vetoContainer: {
        flex : 1,
        justifyContent : "center"
      },
    
      vetoContainerInner: {
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center"
      },
    
      vetoHeadlineContainer : {
        paddingBottom : 40
      },
    
      vetoHeadline : {
        fontSize : 32,
        fontWeight : "bold"
      },
    
      vetoScrollViewContainer : {
        height : "50%"
      },
    
      vetoParticipantContainer : {
        paddingTop : 20,
        paddingBottom : 20
      },
    
      vetoParticipantName : {
        fontSize : 24
      },
    
      vetoButtonContainer : {
        width : "100%",
        alignItems : "center",
        paddingTop : 40
      },
    
      choiceScreenHeadline : {
        fontSize : 30,
        marginTop : 20,
        marginBottom : 20
      },
    
      choiceScreenListContainer : {
        width : "94%"
      },
    
      choiceScreenListItem : {
        flexDirection : "row",
        marginTop : 4,
        marginBottom : 4,
        borderColor : "#e0e0e0",
        borderBottomWidth : 2,
        alignItems : "center"
      },
    
      choiceScreenListItemName : {
        flex : 1
      },

});

//make this component available to the app
export default ChoiceScreen;
