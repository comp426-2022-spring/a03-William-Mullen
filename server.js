const express = require('express')
const res = require('express/lib/response')
const app = express()

var port = 5000

const args = require('minimist')(process.argv.slice(2))
args["port"]
var port = args.port || 5000 || process.env.PORT

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

function coinFlip() {
    let flip = Math.random();
    if (flip < 0.5)
      return "tails"
    return "heads"
  }

function coinFlips(flips) {
    var results = [];
    var i = 0;
    while (i<flips) {
      results[i] = coinFlip();
      i++;
    }
    return results
  }

function countFlips(array) {
    var headsNum = 0;
    var tailsNum = 0;
    array.forEach(element => {
      if (element == "heads")
        headsNum++;
      else
        tailsNum++;
    });
    let dict = new Object()
    dict["heads"] = headsNum
    dict["tails"] = tailsNum
    return dict
  }

function flipACoin(call) {
    let dict = new Object()
    dict["call"] = call
    let flip = coinFlip()
    dict["flip"] = flip
    if (flip == call)
      dict["result"] = "win"
    else 
      dict["result"] = "lose"
    return dict
  }

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip' : flip})
})

app.get('/app/flips/:number', (req, res) => {
    
    var results = coinFlips(req.params.number)
    var count = countFlips(results)
    res.status(200).json({ 'raw' : results, "summary": count})
})

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
    });

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
    });

app.use(function(req, res) {
    res.status(404).send("404 NOT COUND")
    res.type("text/plain")
})