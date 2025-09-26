// Desenvolver a lógica de envio da requisição.
async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const resposta = await fetch("http://localhost:5000/login",
            {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            })
            
            if (resposta.ok) {
                window.alert("Login bem sucedido")
                console.log(await resposta.json());
                localStorage.setItem("token-app", resposta);
            } else {
                window.alert("Email ou senha inválido");
            }
    } catch (err) {
        if (err) {
            window.alert(err)
            console.log("Erro no login");
        }
    }
}