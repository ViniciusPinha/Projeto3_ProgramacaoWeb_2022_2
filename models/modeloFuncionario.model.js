const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
require('mongoose-type-url');

var funcionarioSchema = new mongoose.Schema({
    nomeCompleto: {
        type: String,
        required: 'This field is required.'
    },
    emailFuncionario: {
        type: String,
        required: 'This field is required.'
    },
    fotoDePerfil: {
        type: mongoose.SchemaTypes.Url,
        required: 'This field is required.'
    }
});

funcionarioSchema.path('emailFuncionario').validate((val) => {
    emailFuncionarioRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFuncionarioRegex.test(val);
}, 'Email funcionário inválido');

funcionarioSchema.path('nomeCompleto').validate((val) => {
    nomeCompletoRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
    return nomeCompletoRegex.test(val);
}, 'Nome completo funcionário inválido');

mongoose.model('Funcionario', funcionarioSchema);

