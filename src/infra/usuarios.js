import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { inserirUsuario, obterUsuario } from "./users.js";

let userSenha = "123456";

export async function logarUsuario(email, senha) {
    let retorno = {};
    try {
        const credenciais = await signInWithEmailAndPassword(auth, email, senha);
        retorno.id = credenciais.user.uid;
        retorno.email = email;
        userSenha = senha;

        const usuario = await obterUsuario(retorno.id);
        if (usuario) {
            retorno.nome = usuario.nome;
            retorno.isAdmin = usuario.isAdmin;
            retorno.permitido = usuario.permitido;
        } else {
            retorno.erro = "Usuário não encontrado no banco de dados!";
            throw new Error(retorno.erro);
        }

        if (!retorno.permitido) {
            retorno.erro = "Usuário bloqueado! Entre em contato com um administrador.";
            alert(retorno.erro);
            return;
        }
    } catch (error) {
        retorno.erro = "Login Inválido";
        alert(retorno.erro);
    }

    return retorno;
}

export async function criarContaSemMudarLogin(usuario) {
    let retorno = {};
    const usuarioAtual = auth.currentUser;

    try {
        const credenciais = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
        retorno.id = credenciais.user.uid;
        retorno.email = usuario.email;
        retorno.isAdmin = usuario.isAdmin;
        retorno.permitido = usuario.permitido;
        retorno.nome = usuario.nome;

        await inserirUsuario(retorno);

        if (usuarioAtual) {
            await signInWithEmailAndPassword(auth, usuarioAtual.email, userSenha);
        }
    } catch (error) {
        console.log(error);
        retorno.erro = "Informações inválidas!";
        alert(retorno.erro);
    }

    return retorno;
}

export async function criarConta(email, senha, nome) {
    let retorno = {};
    try {
        const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
        retorno.id = credenciais.user.uid;
        retorno.email = email;
        retorno.isAdmin = false;
        retorno.permitido = true;
        retorno.nome = nome;

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
    userSenha = "";
    return new Object();
}