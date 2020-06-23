import React, { Component } from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { Root, Toast } from "native-base";

// importacion componentes
import CustomButton from '../Components/CustomButton';
import CustomTextInput from '../Components/CustomTextInput';

// Cada vez que construya un componente y deba hacer algo en el momento de la construcción (que no es obligatorio pero probablemente sea necesario 
//     la mayoría de las veces), comenzará pasando el objeto al que hace referencia el argumento inProps, 
//     que contiene todos los accesorios especificados en el etiqueta para el componente y se pasa al constructor por React Native, 
//     al constructor de la superclase. De hecho, si no hace esto, es probable que tenga problemas con cosas que simplemente no funcionan, por lo que, como regla general, 
//     siempre tendrá que hacerlo. (Puede haber algunos casos en los que no tenga que hacerlo o quiera hacerlo, pero es probable que sean tan pocos y distantes entre sí que es mejor no considerar la posibilidad, 
//         a menos que realmente deba hacerlo).

// El constructor es típicamente donde define un atributo de estado en el componente,
//  también, si necesita uno (no todos los componentes requieren estado, recuerde). Aquí, el objeto de estado contendrá una matriz de objetos que serán los datos que representa la lista.
// Hablando de la lista y la representación, después del constructor viene nuestro método amigable render () de vecindario. Eche un vistazo a todo y luego lo desglosaremos juntos.
class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listData : [ ]
        };
    }
    render() { 
        return ( 
            <Root>
                <View style={styles.listScreenContainer}>

{/* El siguiente es el componente Add Restaurant CustomButton. 
Es una configuración simple, pero el controlador onPress le ofrece algo nuevo para ver. 
Como descubrirá al final de este capítulo, la pantalla de lista (así como la pantalla de agregar de la que hablaremos a continuación) se encuentran dentro de un Navegador de pila de navegación de reacción. Este navegador proporciona una manera de tener múltiples componentes, nuestra lista y agregar pantallas secundarias, apiladas una encima de la otra, de modo que solo una sea visible en un momento dado, y podemos llamar a algunos métodos para cambiar entre ellas. React Navigation agregará automáticamente un atributo de navegación a la colección de accesorios del componente de nivel superior. Ese atributo es un objeto que contiene algunos métodos que podemos llamar, uno de los cuales es navegar (). Lo que le proporcionamos es el nombre de la pantalla que incluye el StackNavigator que queremos mostrar, 
y el navegador se encarga de cambiar entre ellos. */}
                 <CustomButton 
                     text="add Restaurant" width="94%"
                     onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
                 />
                 <FlatList style={styles.restaurantList} data={this.state.listData}
                     renderItem={({item}) => 
                     
                     <View style={styles.restaurantContainer}>
                       <Text style={styles.restaurantName}>{item.name}</Text>
                       <CustomButton text="Delete"
                         onPress={() => {
                             Alert.alert("Please confirm",
                              "Are you sure you want to delete this restaurant?",
                              [
                                  {text: "yes", onPress:()=>{
                                      AsyncStorage.getItem("restaurants",
                                      function(inError, inRestaurants){
                                          if(inRestaurants === null){
                                              inRestaurants = [];
                                          }else{
                                              inRestaurants = JSON.parse(inRestaurants);
                                          }

                                          for(let i = 0; i < inRestaurants.length; i++){
                                              const restaurant = inRestaurants[i];
                                              if(restaurant.key === item.key){
                                                  inRestaurants.splice(i,1);
                                                  break;
                                              }
                                          }
                                          AsyncStorage.setItem("restaurants",
                                          JSON.stringify(inRestaurants),function(){
                                              this.setState({listData: inRestaurants});
                                              Toast.show({
                                                  text: "Restaurant deleted",
                                                  position: "bottom", type:"danger",
                                                  duration: 2000
                                              });
                                          }.bind(this)
                                        );
                                      }.bind(this)
                                    );
                                 }},
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
    restaurantName : { 
        flex : 1 
    }
})
 
export default ListScreen;
