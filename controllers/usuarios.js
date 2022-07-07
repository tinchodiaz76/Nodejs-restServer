const {response} = require('express');
const Usuario= require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {emailExiste}= require('../helpers/db-validators');

const usuariosGet = async (req, res= response)=>{
//    console.log(req.query);
    const { limite=5, desde=0 }=req.query;  //limite=5, significa si no viene el parametro el limite =5

/*
//Estas dos promesas las ejecuto con un Promise.all
    const usuarios= await Usuario.find({estado:true})    //Busca todos los que tiene el estado=true, tambien podemos no filtrar por nada
        .skip(Number(desde))    
        .limit(Number(limite));

    const total= await Usuario.countDocuments({estado:true});   //Cuenta la cantidad de documentos.

//Estas dos promesas las ejecuto con un Promise.all 
*/

    const [total, usuarios]= await Promise.all([Usuario.countDocuments({estado:true}),Usuario.find({estado:true})   //await Promise.all me devulve un array, con el resultado de las promesas
                                                                    .skip(Number(desde))    
                                                                    .limit(Number(limite))
                            ]);


    res.json({total: total,
        usuarios: usuarios});
/*
    const query= req.query; //Con req.query tomo lo que viene en la url, como parametros 
                            //(http://localhost:8080/api/usuarios?q=hola&nombre=martin&apikey=diaz)
                            //Despues del ? vienen todos los parametros, en este casos los queryparams seran
                            //q=hola&nombre=martin&apikey=diaz


    const{q, nombre, apikey, apellido='No vino el apellido'}= req.query //Si el apellido no fue enviado, el valor sera "No vino el apellido"
    res.json({
        msg: 'get API -controlador',
        q, 
        nombre,
        apikey,
        apellido
    });
*/    
}

const usuariosPost = async (req, res= response)=>{
    /*const body= req.body;*/
    //const { nombre, edad}= req.body;    /*req.body es lo que viene en el body*/
    //const body= req.body;

    const { nombre, correo, password, rol } = req.body;                 //Desestructuro body.
    const usuario= new Usuario({nombre, correo, password, rol});      //Creo una instancia del modelo Usuario, con los datos del body

    console.log("correo=", correo);
    //Verifica que el correo sea unico
    /* Este codigo se paso a ./helpers/db-validators
    const existe= await Usuario.findOne({correo}).exec();
    console.log("existe=", existe);

    if (existe)
    {
        return res.status(400).json({
            msg: "Este correo ya fue ingresado"
        })
    }
    */

    //Encripta la constraseña
    const salt= bcryptjs.genSaltSync(10);
    usuario.password =  bcryptjs.hashSync(password, salt);

    //Graba en Mongoose
    await usuario.save();       //Con esta sentencia graba en la BD de Mongoose.

    res.json({
        msg: 'post API -controlador',
        usuario
    });
}

const usuariosPut = async (req, res= response)=>{
    /*Tambien se puede desestructurar*/
    /*const {id}= req.params.id;*/
    const id= req.params.id;    /*con req.params.id, le estoy diciendo que la url (htttp://localhost:8080/api/usuarios/20) 
                                viene compuesta por un :id, y estoy tomando ese valor*/
    
    const { _id, password, google, correo, ...resto}= req.body;    /*Almaceno en "resto", todo lo que me viene en el req.body, 
                                                    menos las propiedades de _id, password, google y correo*/

    //Validemos que el id exista

    //Si viene el password
    if (password)
    {
        //Encripta la constraseña
        const salt= bcryptjs.genSaltSync(10);
        resto.password =  bcryptjs.hashSync(password, salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto);   /*Se modificara el registro que tenga id, que paso en la URL, 
                                                                 con los datos que tiene el objto "resto*/
   
    res.json(
        usuario
    );
}

const usuariosPatch = (req, res= response)=>{
    res.json({
        msg: 'patch API -controlador'
    });
}

const usuariosDelete = async (req, res= response)=>{
    const {id}= req.params;

    console.log("id=", id);

/*
//Para borralo fisicamente
    const usuario= await Usuario.findByIdAndDelete(id);
*/

//Para borrarlo logicamente
    const usuario= await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json({
        usuario: usuario
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}