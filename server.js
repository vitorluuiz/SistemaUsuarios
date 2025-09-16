const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");
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
})


app.listen(port, () => {console.log("aplicação rodando na porta 5000")});
