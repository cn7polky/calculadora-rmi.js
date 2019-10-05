const port = process.env.PORT || 8081
const rmi = require('./libs/server/rmi')
const express = rmi.express
const app = rmi.app

app.use("/static", express.static('./libs'))
app.use(express.static(__dirname + '/web'))

rmi.setImplementation({
    calcular: function (operation, b, a) {
        switch (operation) {
            case '+':
                return parseFloat(b) + parseFloat(a)
                break;
            case '-':
                return parseFloat(b) - parseFloat(a)
                break;
            case '*':
                return parseFloat(b) * parseFloat(a)
                break;
            case '/':
                if (parseFloat(a) === 0) {
                    return 'ERRO'
                } else {
                    return parseFloat(b) / parseFloat(a)
                }
                break;
            default:
                return b
                break;
        }
    }
})

app.listen(port, () => {
    console.log('Executando...')
})