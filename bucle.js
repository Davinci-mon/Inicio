// ejercicio Arrasys y objeto 
//1. Arrasys (listas)
// crea una lista  de tus 3 comidas favoritas 
let comidasFavoritas = ["Pizza", "Sushi", "Tacos"];
// como agrego un elemento a un Array en js
comidasFavoritas.push("Helado");
// muestrame la lista en consola
console.log("Comidas favoritas:", comidasFavoritas);
// 2. Objetos (Diccionarios/Fichas)
// Crea un objeto que te represente a ti (nombre, edad, si te gusta programar).
let alumno = {
    nombre: "David",
    edad: 19,
    programador: true
};
// cómo accedo a la propiedad nombre de mi objeto alumno
console.log("Nombre del alumno:", alumno.nombre);

// Crea una lista de 3 alumnos (objetos) con nombre y calificación.
let alumnos = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Luis", calificacion: 92 },
    { nombre: "Marta", calificacion: 78 }
];

//escribir un bucle que recorra el array de alumnos  e imprima solo los que aprobaron (calificacion >= 80)
for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion >= 80) {
        console.log("Alumno aprobado:", alumnos[i].nombre, "con calificación:", alumnos[i].calificacion);
    }
}
