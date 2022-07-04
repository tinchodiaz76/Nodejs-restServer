const {response} = require('express');

const usuariosGet = (req, res= response)=>{

    const query= req.query; /*Con req.query tomo lo que viene en la url, como parametros 
                            http://localhost:8080/api/usuarios?q=hola&nombre=martin&apikey=diaz
                            Despues del ? vienen todos los parametros, en este casos los queryparams seran
                            q=hola&nombre=martin&apikey=diaz*/

    const{q, nombre, apikey, apellido='No vino el apellido'}= req.query /*Si el apellido no fue enviado, el valor sera "No vino el apellido"*/
    res.json({
        msg: 'get API -controlador',
        q, 
        nombre,
        apikey,
        apellido
    });
}

const usuariosPost = (req, res= response)=>{
    /*const body= req.body;*/
    const { nombre, edad}= req.body;

    res.json({
        msg: 'post API -controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res= response)=>{
    /*Tambien se puede desestructurar*/
    /*const {id}= req.params.id;*/
    const id= req.params.id;    /*con req.params.id, le estoy diciendo que la url viene compuesta por un :id, y estoy tamando ese valor*/
    
    res.json({
        msg: 'put API -controlador',
        id
    });
}

const usuariosPatch = (req, res= response)=>{
    res.json({
        msg: 'patch API -controlador'
    });
}

const usuariosDelete = (req, res= response)=>{
    res.json({
        msg: 'delete API -controlador'
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}