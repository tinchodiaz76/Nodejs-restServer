const mongoose= require('mongoose');

const dbConnection = async() =>{
    console.log(process.env.MongoDB_CNN);
    try{
     
        await mongoose.connect(process.env.MongoDB_CNN ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            /*useCreateIndex: true
            useFindAndModify: false
            */
        });
     /*

        await mongoose.connect(process.env.MongoDB_CNN);
    */
        console.log('Base de Datos Conectada');

    }catch(error){
        throw new Error ('Error al levantar la BD, ' || error);
    }
}

module.exports={dbConnection};