import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

const responderProdutos = (req, res) => {
  res.json(produtos);
};

const cadastrarProduto = (req, res) => {
  const { nome, quantidade, valorUnitario } = req.body;

  if (!nome || !quantidade || !valorUnitario) {
    return res.status(400).json({ erro: "Preencha nome, quantidade e valor unitário" });
  }

  const novoProduto = {
    nome,
    quantidade: Number(quantidade),
    valorUnitario: Number(valorUnitario),
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

app.get(["/produtos", "/api/produtos"], responderProdutos);
app.post(["/produtos", "/api/produtos"], cadastrarProduto);

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
  cadastrarProduto(req, res);
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

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000");
});
