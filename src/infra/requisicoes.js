import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirRequisicao(novaRequisicao) {
    const docRef = await addDoc(collection(db, "requisicoes"), novaRequisicao);
    return docRef.id;
}

export async function listarRequisicoes(usuario) {
    let retorno;
    await getDocs(collection(db, "requisicoes"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });

    return usuario?.isAdmin ? retorno : retorno.filter((requisicao) => requisicao.usuarioId === usuario?.id);
}

export async function excluirRequisicao(id) {
    await deleteDoc(doc(db, "requisicoes", id));
}

export async function atualizarRequisicao(id, novosDados) {
    const docRef = doc(db, "requisicoes", id);
    await updateDoc(docRef, novosDados);
}