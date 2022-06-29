var numberOne = document.querySelector('#numberOne');
var numberTwo = document.querySelector('#numberTwo');
var buttonValidate = document.querySelector('#buttonValidate');
var p = document.querySelector('#p-result');
let conditions = {
    numIguais: false,
    maiorDez: false,
    maiorVinte: false
}
var textExibition = '';

buttonValidate.addEventListener('click', function validade (number1,number2) {
    p.innerText = ''
    if (numberOne.value == '' || numberTwo.value == '') {
        p.innerText += 'É necessário digitar os números para efetuar o cálculo.';
    } else {
        number1 = parseFloat(numberOne.value);
        number2 = parseFloat(numberTwo.value);
        numberOne.value = ' ';
        numberTwo.value = ' ';
        somaNumeros = number1 + number2;

        if (number1 == number2) {
            conditions.numIguais = true;
            textExibition += `Os números ${number1} e ${number2} são iguais. A soma é igual a ${somaNumeros}, `
        } else {
            textExibition += `Os números ${number1} e ${number2} são diferentes. A soma é igual a ${somaNumeros}, `
        }

        if (somaNumeros > 10) {
            conditions.maiorDez = true;
            textExibition += 'é maior que dez e '
            if (somaNumeros > 20) {
                conditions.maiorVinte = true;
                textExibition += 'vinte.'
            } else {
                textExibition += 'menor do que vinte.'
            }
        } else {
            textExibition += 'é menor que dez e vinte. '
        }
        
        p.innerText += textExibition;
        textExibition = ' ';
    }
    
})