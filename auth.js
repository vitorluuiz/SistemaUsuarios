const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Bearer dawdkjajkwahfakwfhqoh2iorh2ir3ohwadadwadawdwad
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        // Status code 401 = Não Autênticado
        return res.status(401).json({ erro: "Usuário não autênticado"});
    }

    jwt.verify(token, "meu-segredo", (erro, usuario) => {
        if (erro) {
            res.json({ erro: "Seu token não é válido"});
        }

        req.usuario = usuario;
        next();
    })
};