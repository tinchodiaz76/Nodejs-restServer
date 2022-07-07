const {Router}= require('express');
const {check}= require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, existeUsuarioPorId}= require('../helpers/db-validators');


const router= Router();  //Llamo a la funcion Router, y lo devuelvo en la constante router

router.get('/', usuariosGet);

router.put('/:id', [
    //check('id','El id es obligatorio').not().isEmpty(), Al pedo esta validacion ya que si no viene el parametro "id", no ingresa en esta ruta.
    check('id','No es un ID valido').isMongoId(),   //Verifica si es un ID valido para MongoDB
    check('id').custom(existeUsuarioPorId),         //Verifica que haya algun registro con ese Id en la BD
    check('rol').custom(esRoleValido),  //La que tienen "custom" son validaciones personalizadas.
    validarCampos
    ], usuariosPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password deber ser de mas de 6 letras').isLength({min : 6}),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),  //La que tienen "custom" son validaciones personalizadas.
    validarCampos       //Despues de cada CHECK, verifico si hubo errores.
    ], usuariosPost);  //con validation-express valida que el correo sea valido.
    
router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),   //Verifica si es un ID valido para MongoDB
    check('id').custom(existeUsuarioPorId),         //Verifica que haya algun registro con ese Id en la BD
    validarCampos
    ], usuariosDelete);            

router.patch('/', usuariosPatch);


module.exports=router;
