import express from "express";

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

console.log("Servidor rodando na porta 3000");
