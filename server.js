const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require('dotenv').config();

const usuariosRouter = require("./routes/usuarios.js");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuariosRouter);

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Try catch
connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Bearer dawdkjajkwahfakwfhqoh2iorh2ir3ohwadadwadawdwad
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        // Status code 401 = Não Autênticado
        return res.status(401).json({ erro: "Usuário não autênticado" });
    }

    jwt.verify(token, process.env.CHAVE_PRIVADA, (erro, usuario) => {
        if (erro) {
            res.status(400).json({ erro: "Seu token não é válido" });
        }

        next();
    })
};

app.post("/produtos", autenticarToken, async (req, res) => {
    const { nome, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "As informações do produto estão incorretas" })
    }

    const sql = "INSERT INTO Produtos (nome, preco, categoria) VALUES (?, ?, ?);";
    const values = [nome, preco, categoria];

    connection.query(sql, values, (err, results) => {
        if (err) {
            res.status(400).json({ err })
        }

        res.status(201).json(results);
    })
})

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email ou senha incorretos" });
    }

    const sql = "SELECT * FROM Usuarios WHERE email = ?";
    const values = [email];
    connection.query(sql, values, async (err, results) => {
        if (err) {
            return res.status(400).json({ erro: "Login mal sucedido" })
        }

        if (results.length == 0) {
            return res.status(404).json({ erro: "Email não encontrado" })
        }

        const usuario = results[0];

        const isSenhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (isSenhaCorreta) {
            const token = jwt.sign({ id: usuario.id, email: usuario.email },
                process.env.CHAVE_PRIVADA,
                { expiresIn: "1h" })

            res.status(200);
            return res.json({ data: "Usuário logado com sucesso", token });
        } else {
            res.status(400);
            return res.json({ data: "Usuário não foi logado" });
        }
    });
})

app.listen(port, () => { console.log("aplicação rodando na porta 5000") });
