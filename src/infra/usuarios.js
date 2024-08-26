import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { inserirUsuario, obterUsuario } from "./users.js";

export async function logarUsuario(email, senha) {
    let retorno = {};
    try {
        const credenciais = await signInWithEmailAndPassword(auth, email, senha);
        retorno.id = credenciais.user.uid;
        retorno.email = email;

        const usuario = await obterUsuario(retorno.id);
        if (usuario) {
            retorno.isAdmin = usuario.isAdmin;
            retorno.permitido = usuario.permitido;
        } else {
            retorno.erro = "Usuário não encontrado no banco de dados!";
            throw new Error(retorno.erro);
        }
    } catch (error) {
        retorno.erro = "Login Inválido";
        alert(retorno.erro);
    }

    return retorno;
}

export async function criarConta(email, senha) {
    let retorno = {};
    try {
        const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
        retorno.id = credenciais.user.uid;
        retorno.email = email;
        retorno.isAdmin = false;
        retorno.permitido = true;

        await inserirUsuario(retorno);
    } catch (error) {
        console.log(error);
        retorno.erro = "Informações inválidas!";
        alert(retorno.erro);
    }

    return retorno;
}

export async function deslogarUsuario() {
    await signOut(auth);
    return new Object();
}