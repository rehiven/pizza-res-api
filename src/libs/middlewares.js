import express from 'express';
const cors = require('cors');
var bodyParser = require("body-parser");

module.exports = app => {
    //settings
    app.set('port', process.env.PORT || 3000, '0.0.0.0');
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use((req, res, next) => {
        res.header("Acces-Control-Allow-Origin", ["http://localhost:3000", "http://192.168.0.7:3000", "http://10.24.10.60:3000"])
        res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })


   

    //middlewares   ---Estos procesan los datos que vienen de los clientes

    app.use(express.json());
}