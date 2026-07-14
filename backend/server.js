import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
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

let cursos = [
  { id: 1, titulo: "Matemática Básica", cargaHoraria: 40, preco: 200 },
  { id: 2, titulo: "Programação em JavaScript", cargaHoraria: 60, preco: 300 },
  { id: 3, titulo: "Banco de Dados", cargaHoraria: 50, preco: 250 },
];

app.get("/cursos", (req, res) => {
  res.json(cursos);
});

app.post("/cursos", (req, res) => {
  const { titulo, cargaHoraria, preco } = req.body;

  const novoCurso = {
    id: cursos.length + 1,
    titulo,
    cargaHoraria,
    preco,
  };

  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
});

app.get("/cursos/:id", (req, res) => {
  const cursoId = parseInt(req.params.id);
  const curso = cursos.find((c) => c.id === cursoId);

  if (curso) {
    res.json(curso);
  } else {
    res.status(404).json({ erro: "Curso não encontrado" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
