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
                 <CustomButton 
                     text="add Restaurant" width="94%"
                     onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
                 />
                </View>
            </Root>
         );
    }
}
 
export default ListScreen;
