const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const cliente = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

const { ReturnDocument } = require('mongodb');

//require('../models/modeloFuncionario.model');
const Funcionario = mongoose.model('Funcionario');

router.get('/', (req, res) => {
    res.render("home", {
        title: "Página inicial"
    });
});

router.get('/login', (req, res) => {
    res.render("login", {
        title: "Página de Login"
    });
});

router.get('/register', (req, res) => {
    res.render("register", {
        title: "Página de Registro"
    });
});

router.post('/register', async(req, res) => {
    console.log(req.errors);
    try {
        const user = await Usuario.findOne({ email: req.body.email });
        if(user) {
            res.render("register",{title: "Registre-se", emailExistenteErro: "Email já em uso, por favor realize login!" });
        }else {
            var usuario = new Usuario();
            usuario.email = req.body.email;
            usuario.password = req.body.password;
            usuario.save((err, doc) => {
                if (!err) {
                    res.render('login');
                }else {
                    if (err.name == 'ValidationError') {
                        validacaoDeErrosUsuario(err, req.body);
                        res.render("register",{viewTitle: "Registre-se", usuario: req.body });
                    }
                    else
                        console.log('Erro durante a inserção de novo usuário: ' + err);
                }
            });
        }
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }
})

router.get('/inserirFuncionario', async (req,res) => {
    res.render('inserirFuncionario', {
        title: "Página de Inserção de Funcionários"
    });
})

router.post('/inserirFuncionario', async (req, res) => {
    try {
        const funcionarios = await Funcionario.findOne({ emailFuncionario: req.body.emailFuncionario})
        if(funcionarios) {
            res.render("inserirFuncionario", {title: "Cadastrar Funcionário", emailFuncionarioErro: "Este email de funcionário já está cadastrado!"});
        } else {
            var funcionario = new Funcionario();
            funcionario.nomeCompleto = req.body.nomeCompleto;
            funcionario.emailFuncionario = req.body.emailFuncionario;
            funcionario.fotoDePerfil = req.body.fotoDePerfil;
            funcionario.save((err, doc) => {
                if (!err) {
                    Funcionario.find((err, docs) => {
                        if(!err) {
                            res.render("buscas", {
                                list: docs
                            });
                        }
                    })
                }else {
                    if (err.name == 'ValidationError') {
                        validacaoDeErrosFuncionario(err, req.body);
                        res.render("inserirFuncionario",{viewTitle: "Cadastrar Funcionário", funcionario: req.body });
                    }
                    else
                        console.log('Erro durante a inserção de novo usuário: ' + err);
                }
            });
        }
    } catch (err) {
        res.status(500).send("Server error: " + err);
        return false;
    }
});


router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Usuario.findOne({ email }).select('+password');
        if(!user){
            res.render('login', {title: "Login", emailExistenteErro: "Email não cadastrado, registre-se!" });
        }
        else if(!await bcrypt.compare(password, user.password)) {
            res.render('login', {title: "Login", senhaIncorretaErro: "Senha incorreta!" });
        } else {
            // REALIZAR ARMAZENAMENTO EM TOKEN E SESSION PARA MANTER LOGADO AO ATUALIZAR A PÁGINA
            res.render('buscas');
        }
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }

});

router.get('/buscas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data } = await api.get(`users/${id}`);
        return dadosUserAPI(req, res, data);
    } catch (error) {
        res.send({error: error.message});
    }
});

router.get('/buscas', async (req, res) => {
    Funcionario.find((err, docs) => {
        if(!err) {
            res.render("buscas", {
                list: docs
            });
        } else {
            console.log('Erro na busca de funcionários: ' + err);
        }
    })
})

function inserirFuncionario(req, res) {
    var funcionario = new Funcionario();
    funcionario.nomeCompleto = req.body.nomeCompleto;
    funcionario.emailFuncionario = req.body.emailFuncionario;
    funcionario.fotoDePerfil = req.body.fotoDePerfil;
    
    funcionario.save((err, doc) => {
        if (!err) {
            res.render('buscas');
        }else {
            if (err.name == 'ValidationError') {
                validacaoDeErrosFuncionario(err, req.body);
                res.render("inserirFuncionario",{title: "Cadastre um funcionario", funcionario: req.body });
                console.log(err);
            }
            else
                console.log('Erro durante a inserção de novo funcionário: ' + err);
        }
    });
}

function validacaoDeErrosUsuario(err, body) {
    console.log(' entrou na validação de erro')
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'email':
                body['emailErro'] = 'Email Inválido, tente novamente!';
                console.log('erro email');
                break;
            case 'password':
                body['senhaErro'] = 'Senha Inválido, mínimo de 8 caracteres!';
                console.log('erro senha');
                break;
            default:
                break;
        }
    }
}

function validacaoDeErrosFuncionario(err, body) {
    console.log(' entrou na validação de erro')
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nomeCompleto':
                body['nomeCompletoErro'] = 'Por favor, utilize apenas letras no nome!';
                console.log('Erro Nome Completo Funcionário');
                break;
            case 'emailFuncionario':
                body['emailFuncionarioErro'] = 'Email Inválido, tente novamente!';
                console.log('Erro Email Funcionário');
                break;
            case 'fotoDePerfil':
                body['fotoDePerfilErro'] = 'Por favor, utilize o endereço da imagem!';
                console.log('Erro foto de perfil Funcionário');
            default:
                break;
        }
    }
}

module.exports = router;