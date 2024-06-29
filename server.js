const express = require('express');
const app     = express();
const http    = require('http');
const server  = http.createServer(app);
const logger  = require('morgan');
const cors    = require('cors');
require ('dotenv').config()
/*
*RUTAS
*/
const users=require('./routes/usersRoutes');

/*
*RUTAS
*/
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port',port);

/*
*LLAMANDO A LAS RUTAS
*/

users(app);


/*
*LLAMANDO  A LAS RUTAS
*/
/*
server.listen(process.env.PORT || 'localhost',function(){
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada')
});
*/
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.get('/',(req,res)=>{
res.send('ruta raiz del backend');
});
//Manejo de Error
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports={
    app:app,
    server:server
}