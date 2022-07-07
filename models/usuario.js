const {Schema, model}= require('mongoose');

const usuarioSchema= Schema(
{
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
        },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
        },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        },        
    img: {
        type: String,
        },            
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
        }, 
    estado: {
        type: Boolean,
        default: true
        },         
    google: {
        type: Boolean,
        default: false
        }                    
})

usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario}= this.toObject(); //Saca las propiedades __v y password, del obeto y engloba el resto de las propiedades en usuario.

    return usuario;
}

module.exports=model('Usuarios',usuarioSchema);