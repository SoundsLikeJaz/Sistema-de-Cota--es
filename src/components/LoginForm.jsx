import {Button, TextField} from "./index.js";
import {logarUsuario} from "../infra/usuarios.js";
import {useContext} from "react";
import { UsuariosContext } from "../context";

const LoginForm = () => {

    const { setUsuario } = useContext(UsuariosContext)

    async function handleClick() {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const user = await logarUsuario(email, senha);
        setUsuario(user);
    }

    return(
        <section className="login-form">
            <h1 className="title">Login</h1>
            <TextField id="email" inputType="email" placeholder="E-mail" label="E-mail" />
            <TextField id="senha" inputType="password" placeholder="Senha" label="Senha" />
            <Button texto="Entrar" onClick={handleClick} />
        </section>
    );
}

export default LoginForm;