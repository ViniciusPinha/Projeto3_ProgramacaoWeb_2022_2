require('./models/db');

const port = process.env.PORT || 3000;

let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users');

const usuarioController = require('./controllers/usuarioController');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', usuarioController);

console.log(users);

app.listen(port, () => {
    console.log('Server rodando na porta 3000!');
});


