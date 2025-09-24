const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Norb@2025",
    database: "SistemaUsuarios"
});

// Try catch
connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

app.get("/usuarios", (req, res) => {
    connection.query("SELECT * FROM Usuarios", (err, results) => {
        if (err) {
            // Status code 200 => OK
            //             201 => Criado
            //             202 => Processamento não concluído
            // Status code 400 => erro do cliente
            // Status code 500 => erro do servidor
            res.status(500).send("Erro na consulta");
        } else {
            res.status(200);
            res.json(results);
        }
    });
});

app.post("/usuarios", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (nome == "" || email == "" || senha == "") {
        res.status(400);
        res.json({ data: "Informações inválidas" });
    }

    try {

        const saltRounds = 8;
        const hash = await bcrypt.hash(senha, saltRounds);

        const sql = "INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)";
        const values = [nome, email, hash];

        connection.query(sql, values, (err, results) => {
            if (err) {
                res.status(500).send("Erro na consulta");
            } else {
                res.status(201);
                res.json(results);
            }
        });

    } catch (err) {
        res.status(500).json({ erro: "Erro no bcrypt" });
    }
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ erro: "Email ou senha incorretos" });
    }

    const sql = "SELECT * FROM Usuarios WHERE email = ?";
    const values = [email];
    connection.query(sql, values, async (err, results) => {
        if (err) {
            return res.status(400).json({ erro: "Login mal sucedido" })
        }

        if (results.length == 0) {
            res.status(404).json({ erro: "Email não encontrado" })
        }

        const usuario = results[0];

        const isSenhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (isSenhaCorreta) {

            const token = jwt.sign({ id: usuario.id, email: usuario.email },
                "meu-segredo",
                { expiresIn: "1h" })

            res.status(200);
            res.json({ data: "Usuário logado com sucesso", token });
        } else {
            res.status(400);
            res.json({ data: "Usuário não foi logado" });
        }
    });
})

app.listen(port, () => { console.log("aplicação rodando na porta 5000") });
