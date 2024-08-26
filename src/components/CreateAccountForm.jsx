import {Button, TextField} from "./index.js";
import {useContext} from "react";
import { UsuariosContext } from "../context";
import {criarConta} from "../infra/usuarios.js";

const CreateAccountForm = () => {

    const { setUsuario } = useContext(UsuariosContext)

    async function handleClick() {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if(email && senha && senha === confirmarSenha) {
            const user = await criarConta(email, senha);
            setUsuario(user);
        } else {
            alert("Informações inválidas.");
        }
    }

    return(
        <section className="login-form">
            <h1>Cadastre-se</h1>
            <TextField id="email" inputType="email" placeholder="E-mail" label="E-mail" />
            <TextField id="senha" inputType="password" placeholder="Senha" label="Senha" />
            <TextField id="confirmarSenha" inputType="password" placeholder="Confirmar senha" label="Confirmar senha" />
            <Button texto="Entrar" onClick={handleClick} />
        </section>
    );
}

export default CreateAccountForm;