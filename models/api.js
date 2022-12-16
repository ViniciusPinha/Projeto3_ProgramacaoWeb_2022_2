const axios = require('axios');

const api = axios.create({
    baseURL: 'https://reqres.in/api/',
});

module.exports = api;

/* BUSCA DIRETA DE USUÁRIO

router.get('/buscas', async (req, res) => {
    try {
        const { data } = await api.get("users/2");
        return dadosUserAPI(req, res, data);
    } catch (error) {
        res.send({error: error.message});
    }
});

async function dadosUserAPI(req, res, data) {
    res.send({ id: data.data.id , email: data.data.email , 
        first_name: data.data.first_name , last_name: data.data.last_name , avatar: data.data.avatar});
}

    BUSCA DE CADA USUÁRIO ÚNICO

router.get('/buscas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data } = await api.get(`users/${id}`);
        return dadosUserAPI(req, res, data);
    } catch (error) {
        res.send({error: error.message});
    }
});

async function dadosUserAPI(req, res, data) {
    res.send({ id: data.data.id , email: data.data.email , 
        first_name: data.data.first_name , last_name: data.data.last_name , avatar: data.data.avatar});
}

*/