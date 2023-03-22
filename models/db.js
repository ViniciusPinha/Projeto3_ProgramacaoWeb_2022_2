const mongoose = require('mongoose');
const cliente = require('mongodb').MongoClient;
require('dotenv').config()

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.plo4ywk.mongodb.net/${dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Servidor conectado');
    }else {
        console.log('Erro na conexão com o servidor: ' + err);
    }
});
require('./modeloUsuario.model')
require('./modeloFuncionario.model')