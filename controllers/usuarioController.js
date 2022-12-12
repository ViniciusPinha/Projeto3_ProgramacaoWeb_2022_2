const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const cliente = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render("home", {
        viewTitle: "Página inicial"
    });
});

router.get('/login', (req, res) => {
    res.render("login", {
        viewTitle: "Página de Login"
    });
});

router.get('/register', (req, res) => {
    res.render("register", {
        viewTitle: "Página de Registro"
    });
});

router.post('/register', (req, res) => {
    if (req.body._id == '')
        inserirUsuario(req, res);
        else
        inserirUsuario(req, res);
});


router.post('/login', (req, res) => {
    if (req.body._id == '')
        verificarUsuario(req, res);
        else
        verificarUsuario(req, res);
});

function inserirUsuario(req, res) {
    var usuario = new Usuario();
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.save((err, doc) => {
        if (!err) {
            res.render('login');
        }else {
            if (err.name == 'ValidationError') {
                validacaoDeErros(err, req.body);
                res.render("register",{viewTitle: "Registre-se", usuario: req.body });
            }
            else
                console.log('Erro durante a inserção de novo usuário: ' + err);
        }
    });
}

function validacaoDeErros(err, body) {
    console.log(' entrou na validação de erro')
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'email':
                body['emailErro'] = 'Email Inválido, tente novamente!';
                console.log('erro email');
                break;
            case 'password':
                body['SenhaErro'] = 'Senha Inválido, mínimo de 8 caracteres!';
                console.log('erro senha');
                break;
            default:
                break;
        }
    }
}

async function verificarUsuario(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Usuario.findOne({ email }).select('+password');
    if(!user){
        req.body['emailIncorretoErro'] = 'Email não cadastrado, registre-se!';
        res.render('login', {viewTitle: "Login", usuario: req.body });
    }
    else if(!await bcrypt.compare(password, user.password)) {
        req.body['senhaIncorretaErro'] = 'Senha incorreta!';
        res.render('login', {viewTitle: "Login", usuario: req.body });
    }

    res.render('buscas');
}


module.exports = router;