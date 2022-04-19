const express = require('express')
const app = express()

var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT',port))
})

app.use(funcion(req, res){
    res.status(404).send("Endpoint does not exist")
})