const express = require("express");

const app = express();

app.get("/usuarios", (req, res) => {

    res.json([{
        id: 1,
        nome: "João",
        email: "joao@email.com"
    },

    {
        id: 2,
        nome: "Maria",
        email: "maria@email.com"
    }
]);

});

app.listen(3000);

function autenticar(req, res, next) {

    const token = req.headers.authorization;

    if (token !== "123456") {
        return res.status(401).json({
            erro: "Não autorizado"
        });

        }

        next();
    }
async function buscarUsuarios() {
    const resposta= await fetch("http://localhost:3000/usuarios", {
        headers: {
            "Authorization": "123456"
        }
    }
    );

    const dados = await resposta.json();
    
    console.log(dados);
}