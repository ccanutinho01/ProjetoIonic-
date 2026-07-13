import express from "express";

const app = express();

const produtos = [
  {
    nome: "Notebook",
    quantidade: 5,
    valorUnitario: 3500,
  },
  {
    nome: "Mouse",
    quantidade: 12,
    valorUnitario: 89.9,
  },
  {
    nome: "Teclado",
    quantidade: 8,
    valorUnitario: 159.9,
  },
];

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.get("/usuarios", (req, res) => {
  res.json([
    {
      id: 1,
      nome: "João",
      email: "joao@email.com",
    },
    {
      id: 2,
      nome: "Maria",
      email: "maria@email.com",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
