const express = require('express')
const res = require('express/lib/response')
const app = express()

var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%',port))
})

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });
    

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({ 'message': req.params.number })
})


function coinFlip() {
    let flip = Math.random();
    if (flip < 0.5)
      return "tails"
    return "heads"
  }

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip' : flip})
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})