import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="App">
      <span>{email}</span>
      <span>{senha}</span>
      <form>
        <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input value={senha} placeholder="Senha" onChange={(e) => setSenha(e.target.value)}></input>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
