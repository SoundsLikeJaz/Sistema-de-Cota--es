import {Button, TextField} from "./index.js";
import {useContext} from "react";
import { UsuariosContext } from "../context";
import {criarConta} from "../infra/usuarios.js";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {

    let navigate = useNavigate();

    const { setUsuario } = useContext(UsuariosContext);

    async function handleClick() {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if(nome && email && senha && senha === confirmarSenha) {
            const user = await criarConta(email, senha, nome);
            setUsuario(user);
            navigate("/");
        } else {
            alert("Informações inválidas.");
        }
    }

    return(
        <section className="login-form">
            <h1>Cadastre-se</h1>
            <TextField id="nome" inputType="text" placeholder="Nome" label="Nome" />
            <TextField id="email" inputType="email" placeholder="E-mail" label="E-mail" />
            <TextField id="senha" inputType="password" placeholder="Senha" label="Senha" />
            <TextField id="confirmarSenha" inputType="password" placeholder="Confirmar senha" label="Confirmar senha" />
            <Button texto="Entrar" onClick={handleClick} />
        </section>
    );
}

export default CreateAccountForm;