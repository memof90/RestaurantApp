import React, {Component} from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { Root, Toast } from "native-base";
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listData : [ ]
        };
    }


    // La parte final de la ecuación es algo a lo que aludí anteriormente, es decir, obtener los datos en la FlatList en primer lugar. Eso se hace en el método componentDidMount (), 
    // que React Native llamará una vez que se haya creado el componente de nivel superior.

    componentDidMount(){

// Primero, 
// debemos considerar qué debería o no debería suceder cuando el usuario presiona el botón de retroceso de hardware 
// en un dispositivo Android. Por defecto, el usuario volverá a través de todas las pantallas a las que ha navegado en orden inverso 
// (se construye una pila a medida que pasa de una pantalla a otra, por lo que presionar hacia atrás solo sale de las pantallas de esa pila). Con frecuencia, esto es precisamente lo que quieres que suceda, pero en esta aplicación, no me pareció que funcionara de la forma lógica que esperabas, por lo que quería deshabilitar esa funcionalidad. Para hacer eso, adjuntas un detector de eventos utilizando la API BackHandler, y la función que se ejecuta solo tiene que devolver verdadero, 
// y la navegación que generalmente ocurre se detendrá.
        // BackHandler.addEventListener("hardwareBackPress", ()=> {return true;});
        // AsyncStorage.getItem("restaurants",
        // // Con eso fuera del camino, es hora de llevar los datos a la FlatList.
        // //  Está sentado allí en AsyncStorage, por supuesto, 
        // //  por lo que es solo una cuestión de usar el mismo método getItem () que viste hace un momento, hacer la misma comprobación de nulo para evitar errores y luego llamar a setState () en el componente y pasar la lista de restaurantes como el atributo listData. 
        // // React Native se encarga de todo lo demás. 
        // function(inError, inRestaurants){
        //     if(inRestaurants === null) {
        //         inRestaurants = [];
        //     } else {
        //         inRestaurants = JSON.parse(inRestaurants);
        //     }
        //     this.setState({ listData: inRestaurants});
        // }.bind(this)
        // );

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
        this.setState({ listData : inRestaurants });
      }.bind(this)
    );
    };
  


    render() { 
        return ( 
            <Root>
                <View style={styles.listScreenContainer}>

                    {/* El siguiente es el componente Add Restaurant CustomButton. 
                    Es una configuración simple, pero el controlador onPress le ofrece algo nuevo para ver. 
                    Como descubrirá al final de este capítulo, la pantalla de lista (así como la pantalla de agregar de la que hablaremos a continuación) se encuentran dentro de un Navegador de pila de navegación de reacción. Este navegador proporciona una manera de tener múltiples componentes, nuestra lista y agregar pantallas secundarias, apiladas una encima de la otra, de modo que solo una sea visible en un momento dado, y podemos llamar a algunos métodos para cambiar entre ellas. React Navigation agregará automáticamente un atributo de navegación a la colección de accesorios del componente de nivel superior. Ese atributo es un objeto que contiene algunos métodos que podemos llamar, uno de los cuales es navegar (). Lo que le proporcionamos es el nombre de la pantalla que incluye el StackNavigator que queremos mostrar, 
                    y el navegador se encarga de cambiar entre ellos. */}
                    <CustomButton
                    text="Add Restaurant"
                    width="94%"
                    onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
                  />
                 <FlatList style={styles.restaurantList} data={this.state.listData}
                     renderItem={ ({item}) =>
                     
                     <View style={styles.restaurantContainer}>
                       <Text style={styles.restaurantName}>{item.name}</Text>
                            {/* Ahora, dentro de ese botón hay un controlador onPress, 
                            y hay algunas cosas interesantes que suceden allí. 
                            Primero, la API de alerta se usa para pedirle al usuario que confirme la eliminación. 
                            Hay tres botones presentes: Sí, No y Cancelar. Al presionar cualquiera de ellos (o tocar fuera de la ventana emergente en Android, 
                            gracias al atributo cancelable que se establece en verdadero), 
                            se cerrará la ventana emergente sin que ocurra nada. 
                            Es el código dentro del controlador del botón Sí que hace todo el trabajo, como era de esperar. */}
                       <CustomButton text="Delete"
                         onPress={() => {
                             Alert.alert("Please confirm",
                              "Are you sure you want to delete this restaurant?",
                              [
                                  {text: "yes", onPress:()=>{
                                    // Ese trabajo se realiza en dos partes. 
                                    // Primero, el restaurante debe ser eliminado. 
                                    // Esto se hace mediante el uso de la API AsyncStorage, 
                                    // para recuperar la lista de restaurantes. AsyncStorage es muy similar al almacenamiento local en un navegador web, ya que es un simple almacén de datos de valores clave. 
                                    // Solo puede almacenar cadenas en él, por lo que tendrá que serializar y deserializar cualquier cosa hacia y desde una cadena, como un objeto JavaScript, como es el caso aquí. 
                                    // Se llama al método getItem () para obtener el objeto debajo de los restaurantes clave. 
                                    // Si todavía no hay ninguno, lo que significa que el usuario no ha creado ningún restaurante, se crea una matriz vacía. 
                                    // De lo contrario, la cadena recuperada se deserializa en un objeto utilizando el conocido método JSON.parse () (y disponible en React Native code). 
                                    // Después de eso, se trata simplemente de iterar la matriz y encontrar el restaurante con la clave 
                                    // (que todos los restaurantes tienen) que coincida con la clave del elemento del elemento FlatList que se representa y eliminarlo de la matriz.

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
                                        //   Una vez eliminado de la matriz, el siguiente paso es volver a escribir la matriz en el almacenamiento, utilizando AsyncStorage.setItem (), utilizando JSON.stringify () 
                                        //   para serializar la matriz de restaurantes en una cadena para el almacenamiento. Tenga en cuenta que tanto getItem () como setItem () 
                                        //   son métodos asincrónicos, por lo que deberá proporcionar un controlador de devolución de llamada para cada uno, y la eliminación de la matriz y la llamada a 
                                        //   setItem () se realiza en la devolución de llamada para getItem () llamada.
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
                                 {text: "No"},{text:"Cancel", style:"cancel"}
                              ],
                              {cancelable:true}
                             )
                         }}
                       />
                     </View>

                     }
                 />
                </View>
            </Root>
         );
    }
}

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
                    <CustomTextInput label="Name" maxLength={20}
                        stateHolder={this} stateFieldName="name"
                    />
                    <Text style={styles.fieldLabel}>Cuisine</Text>
                <View style={styles.pickerContainer}>
                {/* Ahora, tenemos tres contenedores de Vista en el diseño, y en este punto, 
                podemos comenzar a agregar componentes de entrada, 
                el primero de los cuales es un componente CustomTextInput. 
                Esto es para el nombre del restaurante, por lo que proporcionamos el texto de etiqueta apropiado a través del accesorio de etiqueta, 
                le decimos cuál es la longitud máxima de entrada (20) y le decimos qué objeto almacena el estado de este componente 
                (esto, que es una referencia a la instancia de la clase AddScreen en sí, y React Native sabe buscar un atributo de estado en él) 
                y el atributo en ese objeto de estado, nombre. */}

                    <Picker style={styles.picker} prompt="Cuisine"
                    selectedValue={this.state.cuisine}
                    onValueChange={ 
                      (inItemValue) => this.setState({ cuisine : inItemValue }) }
                    >
                    {/* Después de eso viene la entrada del tipo de cocina del restaurante. 
                    Esto se hace a través de un componente Picker, uno que viene con React Native. 
                    Es un simple control giratorio en iOS y un cuadro de diálogo emergente con una lista desplazable de opciones en las que se puede hacer clic en Android, 
                    cuyo objetivo es obligar al usuario a seleccionar una opción de una lista de opciones disponibles. Pero, simplemente poner un componente Selector no sería suficiente, 
                    porque el usuario no sabría para qué es necesariamente, por lo que agregaremos un componente de Texto antes como etiqueta, 
                    y a ese componente de Texto, aplicaremos este estilo : */}
                    <Picker.Item label="" value=""/>
                    <Picker.Item label="Algerian" value="Algerian" />
                    <Picker.Item label="American" value="American" />
                    <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>
                {/* La definición de Picker en sí es, creo, bastante obvia. 
                El accesorio de solicitud es solo para Android, porque cuando se hace clic en el Selector, 
                Android abre una ventana emergente para que el usuario lo use para hacer su selección, y este accesorio garantiza que la etiqueta en la pantalla de agregar se replique en esa ventana emergente. 
                El valor seleccionado selecciona el selector con el atributo de objeto de estado apropiado, y onValueChange se encarga de actualizar ese valor cuando cambia. Luego,
                 el Selector obtiene algunos componentes secundarios definidos debajo, Selector. Componentes del elemento para ser precisos, en los que cada uno recibe una etiqueta y un valor,
                  siendo este último el que se establecerá en el estado. En el siguiente código, he recortado un poco los elementos de la lista con las elipses, 
                solo para ahorrar un poco de espacio, pero confía en mí, están incluidos en el código real. */}
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
          />
          { /* ########## Address ########## */ }
          <CustomTextInput
            label="Address"
            maxLength={20}
            stateHolder={this}
            stateFieldName="address"
          />
           { /* ########## Web Site ########## */ }
          <CustomTextInput
            label="Web Site"
            maxLength={20}
            stateHolder={this}
            stateFieldName="webSite"
          />
            {/* Sin embargo, ¿se dio cuenta de que ninguno de estos campos es obligatorio? 
            Bueno, no lo son! De hecho, puede crear un restaurante sin nombre ni datos, 
            lo que lo hace prácticamente inútil. Sin embargo, hice esto a propósito, 
            solo para poder sugerir esto: ¿por qué no te tomas un pequeño descanso aquí y 
            ves si puedes descubrir cómo hacer que los campos sean obligatorios? 
            ¿React Native ofrece algún tipo de indicador de "hacer que este campo sea obligatorio"? 
            ¿O tiene que escribir algún código, digamos, en el botón Guardar, que veremos en breve, para hacer la validación y mostrar un mensaje si falta algo 
            (eso puede o no ser una pista)? ¿Existen en realidad múltiples formas de hacerlo entre las que puede elegir, tal vez incluyendo algunas bibliotecas de terceros? 
            He dejado esto como un ejercicio para ti, querido lector. */}

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

         {/* Inside this View goes two CustomButton components, 
         for Cancel and Save, respectively. The buttons are sized to 44% the width of the screen, 
         which leaves 12% of the width for spacing. Because the parent View is laying these out centered in a row, 
         that means 4% of the width of the screen will be on either side of the buttons and also between them 
         (all must total 100%, after all) */}
         {/* El botón Cancelar no tiene mucho trabajo que hacer: simplemente regresa a la pantalla de la lista, haciendo una llamada a navigation () en el atributo props.navigation del componente de nivel superior, tal como lo vio en el botón Agregar restaurante controlador onPress.
        Sin embargo, el botón Guardar tiene más trabajo por hacer, a saber, guardar el restaurante para el que el usuario acaba de ingresar información. 
        Para hacer eso, primero debemos recuperar la lista de restaurantes de AsyncStorage, tal como lo vio en la pantalla de la lista. Una vez hecho esto, 
        todo lo que tenemos que hacer es insertar el objeto de estado para el componente de nivel superior en la matriz
        de restaurantes, porque contiene todos los datos que estamos guardando, y los vuelve a escribir en AsyncStorage. 
        Finalmente, navegamos de regreso a la pantalla de la lista, a través de nuestro StackNavigator, y React Native se encargará de actualizar la lista, en virtud del método componentDidMount ()
        de la activación de componentes de la pantalla de la lista nuevamente. */}
        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            width="44%"
            onPress={
              () => { this.props.navigation.navigate("ListScreen"); }
            }
          />
          <CustomButton
            text="Save"
            width="44%"
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
                      this.props.navigation.navigate("ListScreen");
                    }.bind(this)
                  );
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