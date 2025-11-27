/**
 * Calcula el área de un círculo dado su radio.
 * 
 * La fórmula utilizada es: A = π * r²
 * 
 * @param {number} radio - El radio del círculo en unidades de medida
 * @returns {number} El área del círculo en unidades cuadradas
 * 
 * @example
 * // Calcula el área de un círculo con radio 5
 * const area = areaCirculo(5);
 * console.log(area); // 78.53981633974483
 */

/**
 * Calcula el área de un rectángulo dado su base y altura.
 * 
 * La fórmula utilizada es: A = base * altura
 * 
 * @param {number} base - La base del rectángulo en unidades de medida
 * @param {number} altura - La altura del rectángulo en unidades de medida
 * @returns {number} El área del rectángulo en unidades cuadradas
 * 
 * @example
 * // Calcula el área de un rectángulo con base 10 y altura 5
 * const area = areaRectangulo(10, 5);
 * console.log(area); // 50
 */

/**
 * Calcula el volumen de un cilindro dado su radio y altura.
 * 
 * Reutiliza la función areaCirculo() para calcular el área de la base,
 * luego multiplica por la altura. La fórmula utilizada es: V = π * r² * h
 * 
 * @param {number} radio - El radio de la base del cilindro en unidades de medida
 * @param {number} altura - La altura del cilindro en unidades de medida
 * @returns {number} El volumen del cilindro en unidades cúbicas
 * 
 * @example
 * // Calcula el volumen de un cilindro con radio 3 y altura 10
 * const volumen = calcularVolumenCilindro(3, 10);
 * console.log(volumen); // 282.7433388230814
 */
//ejercicio : area y volumenes 
// objetivo Crear multiples funciones y reutilizables
//crea una funcion para calcular el  area de un circulo dado su radio 

function areaCirculo(radio) {
    return Math.PI * Math.pow (radio,2);
}
//crea una funcion para calcular el area  de un rectangunlo dado su base y altura 
function areaRectangulo(base, altura) {
    return base * altura;
}
//cra una funcion para calcular el volumen de un cilindro
//crea la funcion 'cxlacularvolumencilindro' reutilizando la funcion 'areacirculo'
function calcularVolumenCilindro(radio, altura) {
    var areaBase = areaCirculo(radio);
    return areaBase * altura;
}
//crea una funcion para calcular una derivada simple de una funcion polinomial de grado n
function derivadaPolinomial(coeficientes) {
    var derivada = [];
    for (var i = 1; i < coeficientes.length; i++) {
        derivada.push(coeficientes[i] * i);
    } 