const express = require("express")
const bodyParser = require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models = require('../models')
const rol = models.Rol
const usuario = models.Usuario

// Multer
const multer = require('multer')
const par = multer()

// Parsing de lo datos
rutas.use( express.urlencoded( {extended : true}) )
rutas.use( express.json() )
rutas.use( par.array() )

/*  Pagina de INicio */
var LR = []
rutas.get('/listadoPorRol', (req,res) => {
    rol.findAll( { } )
        .then( listaRoles => {
            LR = listaRoles
            rpta = []
            res.render('listadoXRol', { lroles: LR, lusuarios: rpta })
        })
        .catch(  error => {
            console.log(error)
            res.status(400).send(error)
        })
})

rutas.post('/consultarXRol', (req,res) => {
    rol.findAll( {
        where: {
            id: req.body.rol
        },
        include: [ { model: usuario, as: 'usuarios'}],
        raw:true
    })
    .then( (rpta) => {
        res.render('listadoXRol', { lroles: LR, lusuarios: rpta })
    })
    .catch(  error => {
        console.log(error)
        res.status(400).send(error)
    })    
})

module.exports = rutas