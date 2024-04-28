async function comprobarDivisibilidad(numero) {
    return new Promise((resolve, reject) => {
        if (numero % 2 === 0) {
            resolve(`${numero} es divisible por dos.`);
        } else {
            reject(`${numero} no es divisible por dos.`);
        }
    });
}

const numero = 10;

comprobarDivisibilidad(numero)
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));

// _______________________________________________________

const comprobarRango = (valor) => {
    return new Promise((resolve, reject) => {
        if (valor >= 0 && valor <= 10) {
            resolve(`${valor} está dentro del rango.`);
        } else {
            reject(`${valor} está fuera del rango.`);
        }
    });
};

const valor = 5;

comprobarRango(valor)
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));

// _______________________________________________________
async function esVocal (letra) {
    const arr = ["a", "e", "i", "o", "u"];
    return new Promise((resolve, reject) => {
        if (arr.includes(letra)) {
            resolve(`${letra} es una vocal.`);
        } else {
            reject(`${letra} no es una vocal.`);
        }
    });
};

const letra = "e";

esVocal(letra)
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));

// _______________________________________________________

async function calcularDivision (num1, num2){
    return new Promise((resolve, reject) => {
        if (num2 !== 0) {
            const division = num1 / num2;
            resolve(`La división de ${num1} entre ${num2} es ${division}.`);
        } else {
            reject("Error: No se puede dividir entre 0.");
        }
    });
};

const num1 = 10;
const num2 = 2;

calcularDivision(num1, num2)
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));