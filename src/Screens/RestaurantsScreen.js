import React, {Component} from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View,Keyboard} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { Root, Toast } from "native-base";
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';

class ListScreen extends Component {



  /**
   * Constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      listData : [ ],
      refreshing: false
    };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { 

    return (

    <Root>
      <View style={styles.listScreenContainer}>
        { /* ########## Add Restaurant button ########## */ }
        <CustomButton
          text="Add Restaurant"
          width="94%"
          onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
        />
        { /* ########## Restaurant list ########## */ }
        
        <FlatList
          style={styles.restaurantList}
          data={this.state.listData}
          refreshing={this.state.refreshing}
          renderItem={ ({item}) =>
          <ScrollView>
            <View style={styles.restaurantContainer}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <CustomButton
                text="Delete"
                onPress={ () => {
                  Alert.alert(
                    "Please confirm",
                    "Are you sure you want to delete this restaurant?",
                    [
                      { text : "Yes", onPress: () => {
                        // Pull data out of storage.
                        AsyncStorage.getItem("restaurants",
                          function(inError, inRestaurants) {
                            if (inRestaurants === null) {
                              inRestaurants = [ ];
                            } else {
                              inRestaurants = JSON.parse(inRestaurants);
                            }
                            // Find the right one to delete and splice it out.
                            for (let i = 0; i < inRestaurants.length; i++) {
                              const restaurant = inRestaurants[i];
                              if (restaurant.key === item.key) {
                                inRestaurants.splice(i, 1);
                                break;
                              }
                            }
                            // Store updated data in storage.
                            AsyncStorage.setItem("restaurants",
                              JSON.stringify(inRestaurants), function() {
                                // Set new state to update list.
                                this.setState({ listData : inRestaurants });
                                // Show toast message to confirm deletion.
                                Toast.show({
                                  text : "Restaurant deleted",
                                  position : "bottom",
                                  type : "danger",
                                  duration : 2000
                                });
                              }.bind(this)
                            );
                          }.bind(this)
                        );
                      } },
                      { text : "No" },
                      { text : "Cancel", style : "cancel" }
                    ],
                    { cancelable : true }
                  )
              } } />
           
            </View>
            </ScrollView>
          }
        />
      </View>
    </Root>

  ); } /* End render(). */



  /**
   * Execute after the component mounts.
   */
  componentDidMount() {

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    // Block hardware back button on Android.
    BackHandler.addEventListener(
      "hardwareBackPress", () => { return true; }
    );

    // Get list of restaurants.
    AsyncStorage.getItem("restaurants",
      function(inError, inRestaurants) {
        if (inRestaurants === null) {
          inRestaurants = [ ];
        } else {
          inRestaurants = JSON.parse(inRestaurants);
        }

        // AsyncStorage.setItem("restaurants",
        // JSON.stringify(inRestaurants), function() {
        //    this.setState({ listData : inRestaurants});
        // }.bind(this)
        // );
        this.setState({ listData : inRestaurants});
       
      }.bind(this)
    );

  }; /* End componentDidMount() */
  // Prevenir React setState en un Componente desmontado
  componentWillUnmount(){

    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
        
  }
//  teclado
  _keyboardDidShow() {
    console.log('teclado abrio');
  }

  _keyboardDidHide() {
    console.log('teclado cerro');
  }


} /* End ListScreen. */


/**
 * #############################################################################
 * Add screen.
 * #############################################################################
 */
class AddScreen extends Component {


  /**
   * Constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      name : "",
      cuisine : "",
      price : "",
      rating : "",
      phone : "",
      address : "",
      webSite : "",
      delivery : "",
      key : `r_${new Date().getTime()}`
    };

  } /* End constructor. */


  /**
   * Render this component.
   */
  render() { 
    return (

    <ScrollView style={styles.addScreenContainer}>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          { /* ########## Name ########## */ }
          <CustomTextInput
            label="Name"
            maxLength={20}
            stateHolder={this}
            stateFieldName="name"
            onSubmitEditing={Keyboard.dismiss}
          />
          { /* ########## Cuisine ########## */ }
          <Text style={styles.fieldLabel}>Cuisine</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              prompt="Cuisine"
              selectedValue={this.state.cuisine}
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
          <Text style={styles.fieldLabel}>Price</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.price}
              prompt="Price"
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
          <Text style={styles.fieldLabel}>Rating</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.rating}
              prompt="Rating"
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
          { /* ########## Phone ########## */ }
          <CustomTextInput
            label="Phone Number"
            maxLength={20}
            stateHolder={this}
            stateFieldName="phone"
            onSubmitEditing={Keyboard.dismiss}
          />
          { /* ########## Address ########## */ }
          <CustomTextInput
            label="Address"
            maxLength={20}
            stateHolder={this}
            stateFieldName="address"
            onSubmitEditing={Keyboard.dismiss}
          />
          { /* ########## Web Site ########## */ }
          <CustomTextInput
            label="Web Site"
            maxLength={20}
            stateHolder={this}
            stateFieldName="webSite"
            onSubmitEditing={Keyboard.dismiss}
          />
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
        </View>
        { /* ########## Buttons ########## */ }
        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            width="44%"
            // 35% android
            onPress={
              () => { this.props.navigation.navigate("ListScreen"); }
            }
          />
          <CustomButton
            text="Save"
            width="44%"
            // 35% android
            onPress={ () => {
              AsyncStorage.getItem("restaurants",
                function(inError, inRestaurants) {
                  if (inRestaurants === null) {
                    inRestaurants = [ ];
                  } else {
                    inRestaurants = JSON.parse(inRestaurants);
                  }
                  inRestaurants.push(this.state);
                  AsyncStorage.setItem("restaurants",
                    JSON.stringify(inRestaurants), function() {
                      this.setState({listData: inRestaurants},() => {
                        console.log(this.state.listData)
                      })  
                      // this.setState({listData:inRestaurants});
                      // this.props.navigation.push("ListScreen");
                      this.props.navigation.replace("ListScreen");
                      Toast.show({
                                  text : "Restaurant save",
                                  position : "bottom",
                                  type : "success",
                                  duration : 2000
                                });
                      
                    }.bind(this)
                  );
                }.bind(this)
              );
            } }
          />
        </View>
      </View>
    </ScrollView>

  ); } /* End render(). */


} /* End AddScreen. */


const styles = StyleSheet.create({
    //     Como mencioné anteriormente, el diseño es un tema que voy a abordar en detalle en el Capítulo 4, pero por ahora, le diré que esta configuración de estilo garantiza que esta Vista llene el
    // pantalla completa (flex: 1) y que cualquier elemento secundario dentro de ella esté centrado tanto horizontalmente (justifyContent: "center") como verticalmente (alignItems: "center"). La plataforma. El método select () 
    // se utiliza para establecer un atributo paddingTop para iOS pero no Android, de modo que el contenedor no se superponga a la barra de estado.
        listScreenContainer : { 
            flex : 1, 
            alignItems : "center", 
            justifyContent : "center",
        ...Platform.select({
        ios : { paddingTop : Constants.statusBarHeight }, 
        android : { }
        }) },
    //     Lo anterior se hace para asegurar que haya espacio en ambos lados de la lista, lo cual me pareció más agradable. Esto funciona porque el estilo de la Vista principal centra a sus hijos, recuerde, así que terminaremos con el 3% del ancho de la pantalla a cada lado de la FlatList.
    // El accesorio renderItem en la FlatList es una función que usted, como desarrollador, proporciona que la FlatList llama para representar cada elemento. Como puede ver, el elemento se pasa a esta función, y puede devolver prácticamente cualquier estructura que pueda desde un método render (), porque debajo de las cubiertas, React Native está creando un componente sobre la marcha de lo que proporciona aquí. En este caso, se crea una Vista para contener el elemento, 
    // ya que tendrá varias partes. Esta vista tiene el siguiente estilo aplicado:
        restaurantList : { 
            width : "94%" 
        },
    //     Si nunca antes ha visto Flexbox en acción, nuevamente, veremos esto
    // en el Capítulo 4: no quiero dejarte aquí alto y seco, así que te diré que flexDirection, cuando se establece en fila, significa que los elementos secundarios de esta Vista se colocarán en
    // una fila, de lado a lado a través de la pantalla. El resto de los atributos son para garantizar que haya un poco de espacio encima y debajo de cada elemento, 
    // que cada elemento tenga un borde gris claro que tenga dos píxeles de grosor y que los elementos secundarios dentro de la Vista estén centrados horizontalmente.
    // Hablando de niños, el primero es un componente de Texto que es simplemente el nombre del restaurante, tomado del objeto pasado al método renderItem prop. Esto tiene un estilo simple aplicado también.
        restaurantContainer : { 
            flexDirection : "row", 
            marginTop : 4, 
            marginBottom : 4,
            borderColor : "#e0e0e0", 
            borderBottomWidth : 2, 
            alignItems : "center" 
        },
        // ¡Sí, más flexbox! Esto es para que el nombre del restaurante ocupe todo el espacio que pueda, menos el espacio para Eliminar CustomButton, que es el segundo
        // niño dentro de la vista. El botón se ajustará automáticamente a su texto, por lo que efectivamente tiene un ancho definido, lo que significa que el componente de nombre de texto llenará cualquier espacio horizontal 
        // que quede después de que se presiona el botón.
        restaurantName : { 
            flex : 1 
        },
         // Debido a que hay bastantes campos de entrada, está casi garantizado que la pantalla física del dispositivo no será lo suficientemente grande como para mostrarlos todos a la vez, por lo que tenemos que permitir el desplazamiento. Ahí es donde entra el componente ScrollView que alberga todos los demás componentes. Este es un componente contenedor que permite al usuario arrastrarlo para desplazarse. 
    // Es como una FlatList, en cierto sentido, pero donde FlatList representa componentes específicos, y lo hace poco a poco a medida que aparecen, 
    // ScrollView representa a todos sus elementos secundarios a la vez y no lo hace con una función definida para representar cada uno. Ser tan simple significa que lo único que debemos considerar es que 
    // ScrollView se superpondrá a la barra de estado si no nos ocupamos de eso, y ahí es donde entra en juego el estilo aplicado.
    // The Expo Constants API is again used to get the height of that status bar, and a simple marginTop style gives us the necessary spacing.
    addScreenContainer : { 
        marginTop : Constants.statusBarHeight 
    },
    // Ahora, si piensa en esta pantalla, en realidad tiene dos partes: 
    // los componentes de entrada de datos y los botones Cancelar y Guardar en la parte inferior. 
    // Para diseñar estas entidades únicas, vamos a crear otra vista dentro de la vista de desplazamiento (para que podamos diseñar ambas secciones en su conjunto también) 
    // y luego crear dos vistas más dentro de esa, 
    // una para los componentes de entrada y uno para los botones. Entonces, 
    // ScrollView tiene una Vista como su primer hijo, y ese tiene el siguiente estilo adjunto:

    // Esto asegura que sus hijos estén centrados y llenen la pantalla horizontalmente. También hay algo de relleno adicional en la parte superior, 
    // para garantizar que cuando el contenido se desplaza, no se desplaza sobre la barra de estado.
    // Luego, dentro de esa Vista hay otra, la primera de las dos que mencioné, esta para los componentes de entrada. Tiene un estilo aplicado también.
    addScreenInnerContainer : { 
        flex : 1, 
        alignItems : "center", 
        paddingTop : 20, 
        width : "100%" 
    },

    // El uso de un ancho del 96% coloca algo de espacio alrededor de los lados de los componentes, 
    // tal como se hizo en la pantalla de la lista.
    addScreenFormContainer : { 
        width : "96%" 
    },
    fieldLabel : { 
        marginLeft : 10 
    },
    // El objetivo aquí es garantizar que la etiqueta se alinee con el lado izquierdo del cuadro del selector, 
    // lo que no será así si no aplicamos este estilo.
    // El selector en sí está envuelto en un componente de vista, 
    // para que se le pueda aplicar el siguiente estilo y para que tenga el efecto deseado:

    // Y ese efecto deseado es principalmente darle un borde al Selector. Además, el ancho se establece en 96%, que el selector llenará, y se agregará algo de relleno a su alrededor, 
    // todo de los cuales se trata de hacer que el selector se vea bien y se ajuste a la pantalla. Sin embargo, tenga en cuenta que Platform.select () 
    // se usa aquí nuevamente, porque, en iOS, estos estilos no son necesarios. De hecho, para que el Selector se vea similar en ambas plataformas, 
    // se requirió la Vista alrededor del Selector, pero para completar la tarea, también debemos aplicar un poco de estilo al Selector mismo.
    pickerContainer : { ...Platform.select({
        ios : { },
        android : { width : "96%", borderRadius : 8, borderColor : "#c0c0c0", borderWidth : 2,
              marginLeft : 10, marginBottom : 20, marginTop : 4
            }
        }) 
    },
    // En este caso, es iOS el que necesita el estilo, donde Android no. 
    // Cuando estos estilos se aplican a la vista que contiene y al selector, 
    // y a las declaraciones Platform.select () consideradas, terminamos con la pantalla parecida en ambas plataformas, 
    // que es el objetivo. No pueden verse perfectamente idénticos, simplemente porque un Picker en iOS se ve y funciona fundamentalmente de manera diferente a uno en Android, 
    // pero este estilo hace que se vean razonablemente parecidos, que es lo que quiero
    picker : { ...Platform.select({
        ios : { width : "96%", borderRadius : 8, borderColor : "#c0c0c0", borderWidth : 2,
              marginLeft : 10, marginBottom : 20, marginTop : 4
            },
            android : { }
          })
    },

    // Ahora, aquí, quiero que los botones estén uno al lado del otro, dispuestos en una fila, de ahí el valor flexDirection de la fila. Sin embargo, todavía quiero que los botones estén centrados, 
    // por lo que justifyContent se establece en el centro (y una vez más, le haré saber que entraremos en todo este flexbox y diseño en más detalle en el próximo capítulo, 
    // pero en general parte, ya has visto los conceptos básicos más importantes a lo largo de este capítulo).
    addScreenButtonsContainer : { 
        flexDirection : "row", 
        justifyContent : "center" 
    }
    })
    

// export default function RestaurantScreens ({ navigation }) {
//         return (  
//             // <View style={styles.homeScreen}>
//             //     <Text>hola desde RestaurantScreens</Text>
//             //     <Button
//             //     title="Go to DesicionScreens"
//             //     onPress={() => navigation.navigate('PeopleScreen')}
//             //    />
//             // </View>
//             <View>
//                 <ListScreen />
//             </View>
            
//         );
    
// }

// const styles = StyleSheet.create({
//     homeScreen: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },

// })
 
const stack = createStackNavigator();

const RestaurantScreen = ({navigation}) => (
    <stack.Navigator initialRouteName="ListScreen" headerMode="none">
        <stack.Screen name="ListScreen" component={ListScreen} />
        <stack.Screen name="AddScreen" component={AddScreen} />
    </stack.Navigator>
)

export default RestaurantScreen;