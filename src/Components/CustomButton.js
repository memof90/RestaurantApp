import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity } from "react-native";


class CustomButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { text, onPress, buttonStyle, textStyle, width, disabled } = this.props;
        
        CustomButton.propTypes = {
            text : PropTypes.string.isRequired, onPress : PropTypes.func.isRequired, buttonStyle : PropTypes.object, textStyle : PropTypes.object,
            width : PropTypes.string, disabled : PropTypes.string
            };

        return (  
            <TouchableOpacity


// Esta es la misma idea básica que cuando creamos un componente: crear una clase que se extienda desde algún componente, aquí, la clase de Componente literal, y construir un método render (). Nuestro CustomButton es solo un componente y envuelto alrededor de un componente y.
// Como puede ver, hay un poco de estilo aplicado a TouchableOpacity, para darle algo de relleno, altura estática y esquina redondeada. Ahora, un botón también tiene un ancho estático, al menos nuestras instancias CustomButton, pero notará que el valor del atributo de estilo ancho se toma del ancho variable.

// El atributo de estilo final es backgroundColor, y aquí usamos algo de lógica para determinar si el botón debe estar atenuado (deshabilitado es verdadero) o si debe ser azul (activo, deshabilitado es falso o no suministrado). Una lógica similar se usa a continuación en el accesorio onPress, de modo que solo un botón activo responde al tacto.
                style={ [
                { padding : 10, height : 60, borderRadius : 8, margin : 10, width : width,
                backgroundColor :
                disabled != null && disabled === "true" ? "#e0e0e0" : "#303656",
                },
                buttonStyle ]}

                onPress={ () => { if (disabled == null || disabled === "false") {
                        onPress() } } }
             >

{/* El componente Text está dentro de TouchableOpacity y es poco más que un estilo básico, de nuevo usando la notación de matriz (con la cual textStyle puede anular o
Capítulo 3 Selector de restaurante, parte 1

extender el estilo base), para que esos estilos se puedan cambiar o ampliar, según sea necesario, y luego el texto en sí, tomado del accesorio de texto definido anteriormente.
No es realmente un código sofisticado de ninguna manera, pero muestra bastante sobre la creación de componentes personalizados. Sin embargo, hay una última cosa que debemos hacer, y sospecho que sabes lo que es: exportar el componente.
exportar CustomButton predeterminado;
React Native se encargará de agregar CustomButton a su registro interno de componentes cuando importe este módulo a otro, que es lo que hace que <CustomButton> funcione, como verá muy pronto. */}
             <Text 
             style={ [
                { fontSize : 20, fontWeight : "bold", color : "#ffffff",
                textAlign : "center", paddingTop : 8 },
                textStyle ]} >
               {text}
             </Text>

            </TouchableOpacity>
        );
    }
}
 
export default CustomButton;