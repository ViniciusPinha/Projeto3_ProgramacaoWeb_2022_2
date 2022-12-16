const mongoose = require('mongoose');
const cliente = require('mongodb').MongoClient;

mongoose.connect('mongodb+srv://viniciuspinha:mongodb123@cluster0.plo4ywk.mongodb.net/UsuariosDB?retryWrites=true&w=majority', { useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Servidor conectado');
    }else {
        console.log('Erro na conexão com o servidor: ' + err);
    }
});
require('./modeloUsuario.model')
require('./modeloFuncionario.model')