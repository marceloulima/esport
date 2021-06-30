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

//Parsing de los datos
rutas.use( express.urlencoded({extended : true}))
rutas.use( express.json() )
rutas.use( par.array() )


/* Pagina de inicio */
var LR = []
rutas.get('/', (req,res) => {
    rol.findAll( { } )
        .then( listaRoles => {
            LR = listaRoles
            res.redirect('consultar')
        })
        .catch(  error => {
            console.log(error)
            res.status(500).send(error)
        })
})

/* Consulta total */
rutas.get('/consultar', (req,res) => {
    usuario.findAll( { } )
        .then( rpta => {
            res.render('listado', { lroles: LR, lusuarios: rpta })
        })
        .catch(  error => {
            console.log(error)
            res.status(500).send(error)
        })
})

/* Insertar */ 
rutas.get('/agregar' , (req,res) => {
    res.render('agregar', { lroles: LR })
})

rutas.post('/agregar' , (req,res) => {
    usuario.create( {
        nombrecompleto: req.body.nombrecompleto,
        correoelectronico: req.body.correoelectronico,
        rolId : req.body.rol
        
    })
    .then( rpta => {
        res.redirect('consultar')
    })
    .catch(  error => {
        console.log(error)
        res.status(500).send(error)
    })
})

/* Actualizar */
rutas.get('/actualizar',(req,res) =>{
    var indice = req.query.id
    res.render('actualizar', {lroles:LR, indice:indice})
})

rutas.post('/actualizar' , (req,res) => {
    usuario.update( {
        nombrecompleto: req.body.nombrecompleto,
        correoelectronico: req.body.correoelectronico,
        rolId: req.body.rol
    },{
        where:{
            id:req.body.indice
        }

    })
    .then( rpta => {
        res.redirect('consultar')
    })
    .catch(  error => {
        console.log(error)
        res.status(500).send(error)
    })    
})

rutas.get('/eliminar',(req,res) =>{
    usuario.destroy( {
        where:{
            id:req.query.id
        }

    })
    .then( rpta => {
        res.redirect('consultar')
    })
    .catch(  error => {
        console.log(error)
        res.status(500).send(error)
    })    
    
})
module.exports = rutas