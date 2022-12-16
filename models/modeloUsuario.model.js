const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

var usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'This field is required.'
    },
    password: {
        type: String,
        required: 'This field is required.'
    }
});

usuarioSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Email inválido');

usuarioSchema.path('password').validate((val) => {
    passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    return passwordRegex.test(val);
}, 'Senha inválida');

usuarioSchema.pre('save', async function(req, res, next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();    
});

mongoose.model('Usuario', usuarioSchema);

