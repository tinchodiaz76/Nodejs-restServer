const {Router}= require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router= Router();  //Llamo a la funcion Router, y lo devuelvo en la constante router

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);
    
router.delete('/', usuariosDelete);            

router.patch('/', usuariosPatch);


module.exports=router;
