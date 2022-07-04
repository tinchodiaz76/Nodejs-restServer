const express = require('express');
const cors = require('cors')

class Server{
    
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios';

        //Middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();

    }

    middlewares(){

        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());   //Cualquier info que venga la va a tratar de searializar en formato JSON


        //Directorio Publico
        this.app.use(express.static('public'));     //Directorio publico, entonces va y busca el archivo index.html.
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'));

        this.app.get('*', (req, res) => {
            //res.send('404 | Page not found')    //Con res.send esto se enviara al finalizar la peticion.
            //res.sendFile('../public/404.html');   //__dirname indica el path donde se esta ejecutando
            res.sendFile('404.html', {root: 'C:/Workspace/Node-restServer/' + '/public'});
            /*res.send('Page not Found');*/
        })
        

/* Esto lo movemos al archivo ./routes/user.js
        this.app.get('/api', (req, res) =>{
            //res.send('Hello World')
            res.status(403).json({
                msg: 'get API'
            });
          });

        this.app.put('/api', (req, res) =>{
        //res.send('Hello World')
        res.status(500).json({
            msg: 'put API'
            });
        });

        this.app.post('/api', (req, res) =>{
            //res.send('Hello World')
            res.status(201).json({
            msg: 'post API'
            });
        });
            
        this.app.delete('/api', (req, res) =>{
            //res.send('Hello World')
            res.status(403).json({
            msg: 'delete API'
            });
        });            

        this.app.patch('/api', (req, res) =>{
            //res.send('Hello World')
            res.status(403).json({
            msg: 'patch API'
            });
        });
*/        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports= Server;