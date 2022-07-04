const Server = require('./models/server')

require('dotenv').config()

const server= new Server();

server.listen();


//const express = require('express')  Se pasa a una clase
//const app = express()               Se pasa a una clase

/* Se pasa a una clase
app.get('/', (req, res) =>{
  res.send('Hello World')
});

*/
/* Se pasa a una clase
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto', process.env.PORT);
});
*/