/*
  script.js - Calculadora simple (sin eval)

  Estructura:
  - Variables internas: `currentInput` (string), `tokens` (array de tokens: números y operadores).
  - Funciones principales:
    - init(): enlaza eventos y referencia DOM.
    - handleButton(action, value): maneja clics en botones.
    - onKeyDown(e): mapea teclado a acciones.
    - tokenize / shuntingYard / evaluateRPN: convierte tokens a RPN y evalúa.
    - utilidades: pushNumber, clearAll, backspace, toggleSign, percent.

  Cómo probar teclado:
  - Digitos: teclas `0-9`.
  - Punto decimal: `.`
  - Operadores: `+ - * /` (también puedes usar `x` y `X` para multiplicar en algunas teclas si lo mapeas)
  - Igual: `Enter` o `=`.
  - Borrar último: `Backspace`.
  - Limpiar: `Escape`.
  - Porcentaje: `%`.

  Casos de prueba manuales (entrada -> resultado esperado):
  1) 2 + 3 * 4 = -> 14
  2) 5 ÷ 2 = -> 2.5
  3) 12 +/- -> -12  (luego % -> -0.12)

*/

(function(){
  'use strict';

  // DOM
  const elCurrent = document.getElementById('current');
  const elExpression = document.getElementById('expression');
  const keys = document.querySelectorAll('.keys .btn');

  // Estado de la calculadora
  let currentInput = ''; // número que se está ingresando como string
  let tokens = []; // array de tokens: números (string) y operadores ('+', '-', '*', '/')

  // Inicialización
  function init(){
    keys.forEach(btn => btn.addEventListener('click', (e)=>{
      const action = btn.dataset.action;
      const value = btn.dataset.value;
      handleButton(action, value);
    }));

    window.addEventListener('keydown', onKeyDown);
    updateDisplay();
  }

  // Maneja eventos de botones
  function handleButton(action, value){
    switch(action){
      case 'digit': addDigit(value); break;
      case 'decimal': addDecimal(); break;
      case 'operator': addOperator(value); break;
      case 'equals': calculate(); break;
      case 'clear': clearAll(); break;
      case 'backspace': backspace(); break;
      case 'negate': toggleSign(); break;
      case 'percent': applyPercent(); break;
      default: break;
    }
    updateDisplay();
  }

  // Teclado
  function onKeyDown(e){
    const key = e.key;
    if((/^[0-9]$/).test(key)){
      e.preventDefault(); handleButton('digit', key); return;
    }
    if(key === '.') { e.preventDefault(); handleButton('decimal'); return; }
    if(key === '+' || key === '-' || key === '*' || key === '/'){
      e.preventDefault(); handleButton('operator', key); return;
    }
    if(key === 'Enter' || key === '=') { e.preventDefault(); handleButton('equals'); return; }
    if(key === 'Backspace') { e.preventDefault(); handleButton('backspace'); return; }
    if(key === 'Escape') { e.preventDefault(); handleButton('clear'); return; }
    if(key === '%') { e.preventDefault(); handleButton('percent'); return; }
  }

  // Agrega dígito
  function addDigit(d){
    // Evita números con muchos ceros al inicio
    if(currentInput === '0') currentInput = d;
    else currentInput += d;
  }

  // Agrega punto decimal si no existe
  function addDecimal(){
    if(currentInput.includes('.')) return;
    if(currentInput === '') currentInput = '0.';
    else currentInput += '.';
  }

  // Añadir operador
  function addOperator(op){
    if(currentInput !== ''){
      tokens.push(currentInput);
      currentInput = '';
    }
    // Si último token es operador, reemplazarlo
    const last = tokens[tokens.length - 1];
    if(isOperator(last)){
      tokens[tokens.length - 1] = op;
    } else {
      // no permitir empezar con operador excepto '-' (como signo) -> para eso se usa +/-
      if(tokens.length === 0 && op !== '-') return;
      tokens.push(op);
    }
  }

  function isOperator(t){
    return t === '+' || t === '-' || t === '*' || t === '/';
  }

  // Borrar todo
  function clearAll(){
    currentInput = '';
    tokens = [];
  }

  // Borrar último carácter o token
  function backspace(){
    if(currentInput !== ''){
      currentInput = currentInput.slice(0, -1);
    } else if(tokens.length > 0){
      const last = tokens.pop();
      if(!isOperator(last)){
        currentInput = String(last).slice(0, -1);
      }
    }
  }

  // Cambiar signo del número actual (o último número)
  function toggleSign(){
    if(currentInput !== ''){
      if(currentInput.startsWith('-')) currentInput = currentInput.slice(1);
      else currentInput = '-' + currentInput;
    } else if(tokens.length > 0){
      const last = tokens[tokens.length-1];
      if(!isOperator(last)){
        tokens[tokens.length-1] = String(Number(last) * -1);
      }
    }
  }

  // Aplicar porcentaje al número actual
  function applyPercent(){
    if(currentInput !== ''){
      const n = Number(currentInput);
      if(!Number.isNaN(n)) currentInput = String(n / 100);
    } else if(tokens.length > 0){
      const last = tokens[tokens.length-1];
      if(!isOperator(last)) tokens[tokens.length-1] = String(Number(last)/100);
    }
  }

  // Calcular expresión usando shunting-yard y evaluación RPN
  function calculate(){
    if(currentInput !== ''){
      tokens.push(currentInput);
      currentInput = '';
    }
    if(tokens.length === 0) return;

    // Evitar terminar en operador
    if(isOperator(tokens[tokens.length-1])){
      // si termina con operador, ignorarlo
      tokens.pop();
    }

    try{
      const rpn = shuntingYard(tokens);
      const result = evaluateRPN(rpn);
      if(result === Infinity || result === -Infinity || Number.isNaN(result)){
        clearAll();
        currentInput = '';
        elCurrent.textContent = 'Error';
        elExpression.textContent = '';
        return;
      }
      const s = formatNumber(result);
      clearAll();
      currentInput = s;
    } catch(err){
      clearAll();
      currentInput = '';
      elCurrent.textContent = 'Error';
      elExpression.textContent = '';
      console.error(err);
    }
  }

  // Formatea número para evitar notación exponencial innecesaria
  function formatNumber(n){
    if(Number.isInteger(n)) return String(n);
    // limitar a 12 decimales y quitar ceros finales
    return parseFloat(n.toFixed(12)).toString();
  }

  // Shunting-yard: convierte infix tokens a RPN
  function shuntingYard(inputTokens){
    const output = [];
    const ops = [];
    const precedence = { '+':1, '-':1, '*':2, '/':2 };

    inputTokens.forEach(tok => {
      if(isOperator(tok)){
        while(ops.length > 0 && isOperator(ops[ops.length-1]) && precedence[ops[ops.length-1]] >= precedence[tok]){
          output.push(ops.pop());
        }
        ops.push(tok);
      } else {
        // número
        output.push(tok);
      }
    });

    while(ops.length > 0) output.push(ops.pop());
    return output;
  }

  // Evalúa RPN (array) y devuelve número
  function evaluateRPN(rpn){
    const stack = [];
    rpn.forEach(tok => {
      if(isOperator(tok)){
        const b = Number(stack.pop());
        const a = Number(stack.pop());
        let res;
        switch(tok){
          case '+': res = a + b; break;
          case '-': res = a - b; break;
          case '*': res = a * b; break;
          case '/':
            if(b === 0) throw new Error('Division by zero');
            res = a / b; break;
          default:
            throw new Error('Unknown operator ' + tok);
        }
        stack.push(res);
      } else {
        stack.push(Number(tok));
      }
    });
    if(stack.length !== 1) throw new Error('Invalid expression');
    return stack[0];
  }

  // Actualiza la pantalla
  function updateDisplay(){
    elExpression.textContent = tokens.join(' ');
    elCurrent.textContent = currentInput === '' ? (tokens.length? tokens[tokens.length-1] : '0') : currentInput;
  }

  // Inicializar al cargar
  init();

})();
