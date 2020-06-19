import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";


class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        const {
            label, labelStyle, maxLength, textInputStyle, stateHolder,
            stateFieldName
      } = this.props;

      CustomTextInput.propTypes = {
        label : PropTypes.string.isRequired, labelStyle : PropTypes.object, maxLength : PropTypes.number, textInputStyle : PropTypes.object, stateHolder : PropTypes.object.isRequired, stateFieldName : PropTypes. string.isRequired
        };

        return ( 
            <View>
            {/* Una vez más, tenemos algunos accesorios personalizados disponibles: etiqueta es el texto de la etiqueta; labelStyle es cualquier estilo adicional que queremos aplicar a la etiqueta; maxLength nos permite tener una longitud máxima de texto que el usuario puede ingresar; textInputStyle le permite a un desarrollador anular o extender el estilo base de TextInput */}
                <Text style={ [ styles.fieldLabel, labelStyle ] }>{label}</Text>
                {/* Los accesorios stateHolder y stateFieldName son referencias al objeto que almacena el estado para el componente TextInput, y stateFieldName es el nombre del campo en ese objeto, respectivamente. Esto es necesario para que el código en la función de apoyo onChangeText funcione correctamente en todos los casos, porque el objeto podría no ser necesariamente lo que hace referencia esta palabra clave (si no usamos la notación de flecha gruesa) o incluso a qué está vinculada la función si Intentamos hacerlo con una función de estilo clásico. Proporcionar estos accesorios, y hacerlos necesarios, garantiza que este componente sea utilizable en cualquier situación, independientemente de cómo se almacenan los datos de estado en cualquier componente que lo use */}
                {/* El contenido que se representa es un componente de Vista en el nivel superior, un componente de Texto para la etiqueta y el componente TextInput en sí dentro de la Vista. Puede ver cómo se usan stateHolder y stateFieldName dentro de onChangeText para actualizar el valor cuando cambia el valor dentro del componente TextInput. */}
               {/* Por supuesto, este componente, como CustomButton, tiene un propTypes definido después del método render (). */}
               {/* Esta vez, requerimos texto de etiqueta, así como stateHolder y stateFieldName. Después */}
                <TextInput maxLength={ maxLength }
                    onChangeText={ (inText) => stateHolder.setState(
                    () => {
                    const obj = { }; obj[stateFieldName] = inText; return obj;
                    } )}
                    style={ [ styles.textInput, textInputStyle ] } 

                 />

            </View>
         );
    }
}

const styles = StyleSheet.create({
    fieldLabel : { marginLeft : 10 },
    textInput : {
        height : 40, marginLeft : 10, width : "96%", marginBottom : 20,
        ...Platform.select({
            ios : { marginTop : 4, paddingLeft : 10, borderRadius : 8, borderColor : "#c0c0c0", borderWidth : 2
        },
      android : { }
     })
}
})
 
export default CustomTextInput;