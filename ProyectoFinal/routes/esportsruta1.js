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
            res.redirect('consultarAdmin')
        })
        .catch(  error => {
            console.log(error)
            res.status(500).send(error)
        })
})

/* Consulta total */
rutas.get('/consultarAdmin', (req,res) => {
    usuario.findAll( { } )
        .then( rpta => {
            res.render('listadoAdmin', { lroles: LR, lusuarios: rpta })
        })
        .catch(  error => {
            console.log(error)
            res.status(500).send(error)
        })
})

/* Insertar */ 
rutas.get('/agregarAdmin' , (req,res) => {
    res.render('agregarAdmin', { lroles: LR })
})

rutas.post('/agregarAdmin' , (req,res) => {
    usuario.create( {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correoelectronico: req.body.correoelectronico,
        contraseña: req.body.contraseña,
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
rutas.get('/actualizarAdmin',(req,res) =>{
    var indice = req.query.id
    res.render('actualizarAdmin', {lroles:LR, indice:indice})
})

rutas.post('/actualizarAdmin' , (req,res) => {
    usuario.update( {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correoelectronico: req.body.correoelectronico,
        contraseña: req.body.contraseña,
        rolId: req.body.rol
    },{
        where:{
            id:req.body.indice
        }

    })
    .then( rpta => {
        res.redirect('consultarAdmin')
    })
    .catch(  error => {
        console.log(error)
        res.status(500).send(error)
    })    
})

rutas.get('/eliminarAdmin',(req,res) =>{
    usuario.destroy( {
        where:{
            id:req.query.id
        }

    })
    .then( rpta => {
        res.redirect('consultarAdmin')
    })
    .catch(  error => {
        console.log(error)
        res.status(500).send(error)
    })    
    
})
module.exports = rutas