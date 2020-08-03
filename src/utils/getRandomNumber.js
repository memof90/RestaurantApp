
// Hay un bit más de código antes de llegar a las pantallas, 
// y esa es una pequeña función auxiliar para elegir un número aleatorio.


// Es bastante repetitivo: solo un generador de números aleatorios típico que acepta un valor mínimo y un valor máximo y 
// devuelve un número aleatorio dentro de ese rango (inclusive). Debido a que potencialmente deberá llamarse más tarde varias veces dentro de un bucle,
//  tiene sentido extraer el código en una función como esta.
// Ahora, a las pantallas!

/**
 * Helper function to get a random number in a defined range.
 */
export const getRandom = (inMin, inMax) => {
    inMin = Math.ceil(inMin);
    inMax = Math.floor(inMax);
    return Math.floor(Math.random() * (inMax - inMin + 1)) + inMin;
  };

  export default getRandom;

//   getRandom () desde el comienzo del Capítulo 3. 
//   Se elige un número aleatorio, luego el objeto asociado con ese índice en la matriz
//    de FiltrosRestaurantes se almacena en elegidoRestaurante (una de las variables globales del módulo de antes, 
//     recuerde), y luego se realiza una llamada a setState (), configurando selectedVisible a verdadero, 
//     para mostrar ese modal.
// ¡Y eso es todo lo que hay en la pantalla Elección y sus modos asociados
// ! Solo tenemos una pantalla más para mirar y, por supuesto, es lo que el usuario ve después de aceptar este restaurante.