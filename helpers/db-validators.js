const Role = require('../models/role');
const Usuario= require('../models/usuario');

const esRoleValido = async(rol='')=>{
    const existeRol= await Role.findOne({rol});
    if (!existeRol)
    {
        throw new Error(`El rol ${rol} no esta en la BD`);
    }
}

const emailExiste = async(correo='')=>{
    const existeCorreo= await Usuario.findOne({correo}).exec();

    if (existeCorreo)
    {
        throw new Error (`El mail ingresado ${correo} ya esta ingresado en la BD`)
    }
}

const existeUsuarioPorId= async (id)=>{
    const existeId= await Usuario.findById(id);

    if (!existeId)
    {
        throw new Error (`El Id ingresado ${id} no existe en la BD`)
    }
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}