import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox,Icon } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// lootie
import LottieView from "lottie-react-native";

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

   componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
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
            {/* <Image source={require("../images/its-decision-time.android.png")}/> */}
            <LottieView 
            ref={animation => {
              this.animation = animation
            }}
            style={styles.lottieAnimation}
            source={require('../images/food-carousel.json')} 
            />
            <Text style={{padding:20}}>(Click the food to get going)</Text>
          </TouchableOpacity>
       </View>
     );
   }
 }

/**
 * #############################################################################
 * Who's Going screen.
 * #############################################################################
 */

 class WhosGoingScreen extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          people:[ ],
          selected:{ }
       }
  }
  render() { 
      return (  

          <View style={styles.listScreenContainer}>
              <Text style={styles.whosGoingHeadline}>Who's Going?</Text>
              { /* ########## Who's going list ########## */ }
              <FlatList 
              style={{width: "94%"}}
              data={this.state.people}
              renderItem={({item}) => 

                  <TouchableOpacity 
                   style={styles.whosGoingItemTouchable}
                   onPress={
                       function(){
                          // Toggle selected on the person and update the list of
                          // selected people in state.

                          const selected = this.state.selected;
                          selected[item.key] = !selected[item.key];
                          this.setState({selected:selected});
                       }.bind(this)
                   }
                  >
                  
                   <CheckBox 
                       style={styles.whosGoingCheckbox}
                       checked={this.state.selected[item.key]}
                       onPress={
                           function(){
                              // Toggle selected on the person and update the list of
                              // selected people in state.
                              const selected = this.state.selected;
                              selected[item.key] = !selected[item.key];
                              this.setState({ selected : selected});
                           }.bind(this)
                       }/>
                   <Text style={styles.whosGoingName}>
                       {item.firstName} {item.lastName} ({item.relationship})
                   </Text>
                  </TouchableOpacity>
              }     
              />
                  <CustomButton 
                   text="Next"
                   width="94%"
                   onPress={() => {
                       // Construct list of people going for the next screen.
                       participants = [ ];
                          for (const person of this.state.people) {
                              if (this.state.selected[person.key]) {
                              // Copy the person object.
                              const participant = Object.assign({}, person);
                              participant.vetoed = "no";
                              participants.push(participant);
                              }
                          }
                          if (participants.length === 0) {
                              Alert.alert(
                              "Uhh, you awake?",
                              "You didn't select anyone to go. Wanna give it another try?",
                              [ { text : "OK" } ],
                              { cancelable : false }
                              );
                          } else {
                              this.props.navigation.navigate("PreFiltersScreen");
                          }
                   } }
                  />
          </View>

      );
  }

    /**
 * Execute after the component mounts.
 */

componentDidMount() {

  // Block hardware back button on Android.
  BackHandler.addEventListener(
    "hardwareBackPress", () => { return true; }
  );

  // Get list of people.
  AsyncStorage.getItem("people",
    function(inError, inPeople) {
      if (inPeople === null) {
        inPeople = [ ];
      } else {
        inPeople = JSON.parse(inPeople);
      }
      // Construct an object keyed by each person's ID that tells us if that
      // person is selected or not.
      const selected = { };
      for (const person of inPeople) {
        selected[person.key] = false;
      }
      this.setState({
        people : inPeople,
        selected : selected
      });
    }.bind(this)
  );

}; /* End componentDidMount() */
}

/**
 * #############################################################################
 * Pre-filters screen.
 * #############################################################################
 */
class PreFiltersScreen extends Component {


  /**
   * Constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      cuisine : "",
      price : "",
      rating : "",
      delivery : ""
    };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { return (

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

  ); } /* End render(). */


} /* End PreFiltersScreen. */


/**
 * #############################################################################
 * Choice screen.
 * #############################################################################
 */
class ChoiceScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(props) {

    super(props);

      this.state = {
        participantsList : participants,
        participantsListRefresh : false,
        selectedVisible : false,
        vetoVisible : false,
        vetoDisabled : false,
        vetoText : "Veto"
      };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { return (

    <View style={styles.listScreenContainer}>

      { /* ########## Selected Modal ########## */ }
      <Modal
        presentationStyle={"formSheet"}
        visible={this.state.selectedVisible}
        animationType={"slide"}
        onRequestClose={ () => { } }
      >
        <View style={styles.selectedContainer}>
          <View style={styles.selectedInnerContainer}>
            <Text style={styles.selectedName}>{chosenRestaurant.name}</Text>
            <View style={styles.selectedDetails}>
              <Text style={styles.selectedDetailsLine}>
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

  ); } /* End render(). */


} /* End ChoiceScreen. */


/**
 * #############################################################################
 * Post-choice screen.
 * #############################################################################
 */
class PostChoiceScreen extends React.Component {


  /**
   * Constructor.
   */
  constructor(props) {

    super(props);

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { return (

    <View style={styles.postChoiceScreenContainer}>

      <View>
        <Text style={styles.postChoiceHeadline}>Enjoy your meal!</Text>
      </View>

      <View style={styles.postChoiceDetailsContainer}>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Name:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.name}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Cuisine:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.cuisine}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Price:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"$".repeat(chosenRestaurant.price)}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Rating:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"\u2605".repeat(chosenRestaurant.rating)}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Phone:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.phone}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Address:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.address}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Web Site:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.webSite}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Delivery:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.delivery}
          </Text>
        </View>

      </View>

      <View style={{ paddingTop:80}}>
      <Button
        title="All Done"
        onPress={ () => this.props.navigation.navigate("DecisionTimeScreen") }
      />
      </View>

    </View>

  ); } /* End render(). */


} /* End P



// export default function DesicionScreens() {
//         return (  
//           //   <View style={styles.settingScreen}>
//           //   <Text>hola desde DesicionScreen</Text>
//           // </View>
//           <View style={{flex:1}}>
//             <View style={{flex:5, backgroundColor: "red"}}/>
//             <View style={{flex:2, backgroundColor: "green"}}/>
//             <View style={{flex:3, backgroundColor: "blue"}}/>
//           </View>
//         );
    
// }

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

  lottieAnimation:{
    width: 350
  },

  listScreenContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    /* Branch on platform type for different styling. */
    ...Platform.select({
      ios : {
        paddingTop : Constants.statusBarHeight
      },
      android : { }
    })
  },

  whosGoingHeadline : {
    fontSize : 30,
    marginTop : 20,
    marginBottom : 20
  },

  whosGoingItemTouchable : {
    flexDirection : "row",
    marginTop : 10,
    marginBottom : 10
  },

  whosGoingCheckbox : {
    marginRight : 20
  },

  whosGoingName : {
    flex : 1
  },

  preFiltersContainer : {
    marginTop : Constants.statusBarHeight
  },

  preFiltersInnerContainer : {
    flex : 1,
    alignItems : "center",
    paddingTop : 20,
    width : "100%"
  },

  preFiltersScreenFormContainer : {
    width : "96%"
  },

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
  },

  picker : {
    ...Platform.select({
      ios : {
        width : "96%",
        borderRadius : 8,
        borderColor : "#c0c0c0",
        borderWidth : 2,
        marginLeft : 10,
        marginBottom : 20,
        marginTop : 4
      },
      android : { }
    })
  },

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

  postChoiceScreenContainer : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    alignContent : "center",
  },

  postChoiceHeadline : {
    fontSize : 32,
    paddingBottom : 80
  },

  postChoiceDetailsContainer : {
    borderWidth : 2,
    borderColor : "#000000",
    padding : 10,
    width : "96%",
    backgroundColor: '#222831',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },

  postChoiceDetailsRowContainer : {
    flexDirection : "row",
    justifyContent : "flex-start",
    alignItems : "flex-start",
    alignContent : "flex-start"
  },

  postChoiceDetailsLabel : {
    width : 70,
    fontWeight : "bold",
    color : "#ffffff"
  },

  postChoiceDetailsValue : {
    width : 300,
    color: "white"

  }

});
 

const stack = createStackNavigator();

const DesicionScreen = ({navigation}) => (
    <stack.Navigator initialRouteName="DecisionTimeScreen" headerMode="none">
        <stack.Screen name="DecisionTimeScreen" component={DecisionTimeScreen} />
        <stack.Screen name="WhosGoingScreen" component={WhosGoingScreen} />
        <stack.Screen name="PreFiltersScreen" component={PreFiltersScreen} />
        <stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
        <stack.Screen name="PostChoiceScreen" component={PostChoiceScreen} />
    </stack.Navigator>
)

export default DesicionScreen;

