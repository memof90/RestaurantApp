import React, { Component } from 'react'
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

/**
 * The list of people who are participating.
 */
let participants = null;

class WhosGoingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          // las personas que el usuario puede elegir
            people:[ ],
            // y una matriz que registrará cuáles son los seleccionados
            // Hubiera sido posible
            // para almacenar ese estado seleccionado dentro de los objetos 
            // en la matriz de personas en sí, 
            // pero sentí que era más limpio no modificar esos objetos
            // porque se seleccionan en un estado temporal para esta pantalla
            selected:{ }
         }
    }
    render() { 
        return (  

            <View style={styles.listScreenContainer}>
                <Text style={styles.whosGoingHeadline}>Who's Going?</Text>
                { /* ########## Who's going list ########## */ }
                <FlatList 
                // FlatList en sí tiene un ancho del 94%, 
                // para que no choque contra los bordes de la pantalla,
                //  y sus datos apuntan a la matriz de personas en el estado
                style={{width: "94%"}}
                data={this.state.people}
                renderItem={({item}) => 

                // son idénticos, porque si no lo fueran, 
                // te parecería conmovedor CheckBox no da como resultado que el estado de CheckBox cambie.

                // Conceptualmente, imagina que la onPress de TouchableOpacity es lo que se activaría en un evento táctil. 
                // Esto tiene sentido si lo visualizas en términos físicos. Imagine la TouchableOpacity como una caja de plástico transparente, 
                // y en esa caja hay una Casilla de verificación (tal vez imprimió en 3D una casilla de verificación real). 
                // Si intenta presionar la casilla de verificación, su dedo realmente hace contacto con TouchableOpacity primero 
                // (y de hecho no puede tocar la casilla de verificación). 
                // Por lo tanto, pondría el controlador onPress en TouchableOpacity, y las cosas funcionarían como cabría esperar.
                // Pero eso no es lo que pasa.

                // Lo que sucede, o al menos, cómo actúa, es como si TouchableOpacity de alguna manera supiera que hay una casilla debajo
                //  y delega en su controlador onPress. En nuestra versión física, es como si la caja de plástico mágicamente 
                //  permite que su dedo pase a través de ella para tocar la casilla de verificación a continuación, 
                //  pero solo donde está la casilla de verificación. 
                //  Si presiona en cualquier otro lugar de la caja (o en TouchableOpacity), 
                // su dedo no pasa y se activa onPress de TouchableOpacity.

                // Para ser honesto, no estoy seguro de por qué funciona de esta manera. No pude determinar una respuesta. 
                // Pero, al final, la solución al problema es simplemente conectar el mismo controlador tanto a TouchableOpacity como a CheckBox. 
                // De esa manera, el usuario puede tocar cualquier parte del elemento y 
                // obtener el efecto deseado: alternar la casilla de verificación.

                    <TouchableOpacity 
                     style={styles.whosGoingItemTouchable}
                     onPress={
                         function(){
                            // Toggle selected on the person and update the list of
                            // selected people in state.

                            const selected = this.state.selected;
                            selected[item.key] = !selected[item.key];
                            this.setState({selected:selected});

                          // Una cosa que he pasado por alto es por qué a veces se usa bind () 
                          // en los controladores de eventos y por qué a veces no. 
                          // La respuesta simple es que lo hice en ambos sentidos para demostrarle que, de hecho, 
                          // puede hacerlo de cualquier manera. Sin embargo, 
                          // encontrará algunas situaciones en las que no puede usar la notación de flecha gruesa, 
                          // o de lo contrario no tendrá una referencia adecuada al componente a través de esto dentro de la función. En esos casos, 
                          // tendrá que usar la notación de función tradicional como se hace para estos controladores onPress y luego bind () 
                          // esa función al componente a través de esto.
                         }.bind(this)
                     }
                    >
                    
                    {/* El controlador en sí mismo es trivial. Obtenga una referencia a la matriz seleccionada en estado 
                    (que verá inicialmente poblada muy pronto), 
                    alterne el elemento en la matriz asociada con el elemento que el usuario tocó en función de su atributo clave, luego haga un setState (), 
                    para reflejar el actualizar. Debido a que el accesorio verificado de CheckBox está vinculado a la entrada en la matriz seleccionada para esa persona, 
                    el estado visual de CheckBox se actualiza automáticamente. Y, hablando de ese CheckBox, tiene un estilo simple aplicado. */}
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


                    {/* Es el accesorio de onPress que realmente nos importa aquí y que es responsable de crear una serie de personas 
                    que participarán en este evento, de ahí el nombre variable de los participantes. 
                    Se trata simplemente de recorrer la matriz de personas en estado y, 
                    para cada una, buscar en la matriz seleccionada para ver si la entrada de esa persona es verdadera. 
                    Si es así, la persona se copia en la matriz de participantes y se agrega un atributo vetado 
                    establecido en no (que será relevante en las siguientes pantallas). Ahora, si hacemos eso y 
                    encontramos que no hay entradas en la matriz de participantes, entonces, naturalmente, el usuario no ha seleccionado ninguna, 
                    por lo que aparece una alerta para informarles. De lo contrario, usamos el método habitual React Navigation para 
                    transferir al usuario a la pantalla de Prefiltros */}
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

  // La tarea aquí, debido a que este método se activa cuando se crea el componente 
  // (lo que significa cuando se muestra la pantalla), es completar la lista de personas en estado, 
  // extrayéndola de AsyncStorage. 
  // Ya has visto este mismo código antes en la pantalla de Restaurantes, aunque estábamos cargando restaurantes allí, 
  // por supuesto, 
  // por lo que debería resultar familiar. Una vez que la matriz
  // se produce, la matriz seleccionada se crea, con una entrada para cada persona en la matriz inPeople, 
  // con un valor establecido en falso, 
  // para indicar que aún no se han seleccionado. Finalmente, ambos se ponen en estado, ¡y esta pantalla está lista!

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

const styles = StyleSheet.create({

  // Según la discusión anterior sobre flexbox,
  //  ahora sabe que los atributos flex, alignItems y 
  //  justifyContent son responsables de garantizar que la vista llene 
  //  la pantalla y que sus elementos secundarios estén centrados tanto vertical como horizontalmente. 
  //  También es necesario agregar algo de relleno en la parte superior, para que la Vista no se superponga con la barra de estado, 
  //  y ahí es donde entra en juego el método Platform.select (), porque ese relleno solo es necesario en iOS, no en Android. 
  //  La altura de la barra de estado se obtiene con Constantes. statusBarHeight, como has visto antes,
  //  y ese se convierte en el valor paddingTop.

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
    
// El atributo flexDirection se establece en fila, de modo que los dos
//  componentes se colocan uno al lado del otro,
//  y marginTop y marginBottom dan espacio entre cada persona en la lista.
      whosGoingItemTouchable : {
        flexDirection : "row",
        marginTop : 10,
        marginBottom : 10
      },
    
      // Eso es para garantizar que haya espacio entre CheckBox y 
      // el nombre de la persona, que se encuentra en un 
      // componente de Texto después del componente CheckBox
      whosGoingCheckbox : {
        marginRight : 20
      },
      // Eso obligará al componente de Texto a llenar el espacio horizontal restante en esa fila.
      //  El valor del componente de prueba es simplemente una concatenación del nombre, 
      //  el apellido y los atributos de relación del objeto en la matriz de personas.
      whosGoingName : {
        flex : 1
      }

})
 
export default WhosGoingScreen;