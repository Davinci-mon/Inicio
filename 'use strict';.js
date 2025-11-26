'use strict';

/*
  Instrucciones para abrir el terminal en VS Code y ejecutar este archivo:

  1) Abre el terminal: Terminal -> New Terminal.
  2) Cambia al directorio del proyecto:
     cd "c:\Users\david\Documents\Tarea copitol"
  3) Renombrar el archivo (recomendado, evita errores):
     - En VS Code: clic derecho -> Rename -> escribe suma.js
     - PowerShell: Rename-Item -LiteralPath "c:\Users\david\Documents\Tarea copitol\'use strict';.js" -NewName "suma.js"
     - CMD: ren "'use strict';.js" suma.js
  4) Ejecutar con Node:
     node suma.js

  Si NO renuevas el archivo, puedes ejecutar con la ruta original entre comillas:
     node "c:\Users\david\Documents\Tarea copitol\'use strict';.js"
*/

// Función: sumar
// Esta función recibe dos valores, los convierte a números, los suma y devuelve el resultado.
function sumar(a, b) {
  // a: primer valor que queremos sumar (puede ser número o texto que represente un número)
  // b: segundo valor que queremos sumar (puede ser número o texto que represente un número)

  // Convertimos 'a' a número por si viene como texto ('2' → 2)
  a = Number(a);

  // Convertimos 'b' a número por si viene como texto
  b = Number(b);

  // Realizamos la suma y guardamos el resultado en una variable
  var resultado = a + b;

  // Devolvemos el resultado al llamador de la función
  return resultado;
}

// Nueva función: explicarCompromiso
// Devuelve una explicación breve en español sobre qué es un compromiso y su importancia.
function explicarCompromiso() {
  return (
    "Un compromiso es el acuerdo o la decisión consciente de cumplir con una obligación, " +
    "tarea o promesa. Es importante porque genera confianza, responsabilidad y coherencia: " +
    "permite coordinar esfuerzos, alcanzar objetivos y mantener relaciones sólidas. " +
    "Sin compromiso, los proyectos pierden dirección y la colaboración se debilita."
  );
}

// Ejemplos de uso:
// console.log(sumar(2, 3));      // Imprime 5
// console.log(sumar('4', '5'));  // Imprime 9 (convierte las cadenas a números)
// var total = sumar(1.5, 2.25);  // total = 3.75

// Exportar la función para poder importarla en otros módulos (opcional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sumar, explicarCompromiso };
}

// Si ejecutas este archivo directamente, imprime ejemplos en la consola
if (typeof require !== 'undefined' && require.main === module) {
  console.log('sumar(2, 3) =>', sumar(2, 3));
  console.log('sumar("4", "5") =>', sumar('4', '5'));
  var total = sumar(1.5, 2.25);
  console.log('sumar(1.5, 2.25) =>', total);

  // Nueva salida: explicación sobre compromiso
  console.log('\n¿Qué es un compromiso y por qué es importante?');
  console.log(explicarCompromiso());
}
