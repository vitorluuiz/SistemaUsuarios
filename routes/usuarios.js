const express = require("express");
const bcrypt = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
    connection.query("SELECT * FROM Usuarios", (err, results) => {
        if (err) {
            res.status(500).send("Erro na consulta");
        } else {
            res.status(200);
            res.json(results);
        }
    });
});

router.post("/", async (req, res) => {
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

module.exports = router;