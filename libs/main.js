let host = 'http://localhost:8081'

if (location.hostname !== 'localhost') {
    host = 'https://rmi-js.herokuapp.com/'
}

const PR = {
    calcular: function () { }
}

PR.calcular.remote = true
RMIJS.Client(PR).setEndpoint(host) //define o servidor que possui as funções implementadas

let calc = {
    operator: '',
    position: 0,
    values: ['', ''],
    point: false,
    clear: false
}

let digito = Array.from(document.getElementsByClassName('digito'))
let operator = Array.from(document.getElementsByClassName('operador'))

digito.forEach(i => {
    i.addEventListener('click', () => {
        if (calc.clear === true) {
            calc.values[calc.position] = ''
            calc.clear = false
        }
        
        if (i.innerHTML == '.' && calc.point === false) {
            calc.values[calc.position] += i.innerHTML
            calc.point = true
        }
        if (i.innerHTML != '.') {
            calc.values[calc.position] += i.innerHTML
        }
        // console.log(calc.values)
        document.getElementById('display').innerHTML = calc.values[calc.position]
    })
})

operator.forEach(operador => {
    operador.addEventListener('click', () => {
        calc.point = false
        calc.operator = operador.innerHTML
        calc.position = 1
        calc.clear = true
        // console.log(calc.operator)
    })
})

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('display').innerHTML = '0'
    calc.values[0] = ''
    calc.values[1] = ''
    calc.position = 0
    calc.point = false
})

document.getElementById('equal').addEventListener('click', function () {
    PR.calcular(calc.values[0], calc.values[1], calc.operator).then(function () {
        // console.log(`Digito 1: ${calc.values[0]}, digito 2: ${calc.values[1]} - operação: ${calc.operator}`)
        document.getElementById('display').innerHTML = arguments[0]
        calc.clear = true
        calc.position = 0
        calc.values[0] = arguments[0]
        calc.values[1] = ''
        calc.point = false
    })
})