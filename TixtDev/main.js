var express = require('express');
const mysql = require('mysql');
var path = require('path');
const bodyParser = require('body-parser');

import { dirname } from "path";



//Connection BD
var config = require('./configs.json');

var connection = mysql.createConnection(config.mysql);
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
global.db = connection;


//API
var requete = require('./requete.js');
var app = express();
app.use(express.json());

app.route('/voiture') 
  .get(function (req, res) {
    requete.allVehicule(function(err,result){ 
        res.json(result);
    })
  })
  .post(function(req, res){
    requete.addVoiture(req,function(err,result){ 
        res.json(result);
    })
});

app.get('/login/:login.:mdp' , function (req, res) {
    requete.login(req.params.login, req.params.mdp, function(err,result) { 
     res.json(result);
  })
})

app.post('/inscription' , function (req, res,) {
    requete.signup(req,function(err,result){ 
    res.json(result);
  })
})

app.post('/updateUtilisateur', function (req, res) {
  requete.updateUtilisateur(req,function(err,result){ 
      res.json(result);
  })
})

app.get('/delUtilisateur/:id', function (req, res) {
  requete.delUtilisateur(req.params.id,function(err,result){ 
      res.json(result);
  })
})

app.post('/updateVehicule', function (req, res,) {
    requete.updateVehicule(req,function(err,result){ 
        res.json(result);
    })
})

app.post('/delVoiture/:id', function (req, res) {
    requete.delVoiture(rereq.params.id,function(err,result){ 
        res.json(result);
    })
})

app.get('/VehiculeUtilisateur/:id', function (req, res) {
    requete.VehiculeUtilisateur(req.params.id, function(err,result){ 
        res.json(result);
    })
})

//Serveur en ecoute :


const port = process.env.port || 4007;
const server = express();
server.use(express.static(__dirname));

server.get("*", (req,res) => {
    res.sendFile(path.resolve(dirname,"index.html"));
})

server.listen(port);


module.exports = app;