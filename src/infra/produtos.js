import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirProduto(novoProduto) {
    const docRef = await addDoc(collection(db, "produtos"), novoProduto);
    return docRef.id;
}

export async function listarProdutos() {
    let retorno;
    await getDocs(collection(db, "produtos"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function excluirProduto(id) {
    await deleteDoc(doc(db, "produtos", id));
}

export async function atualizarProduto(id, novosDados) {
    const docRef = doc(db, "produtos", id);
    await updateDoc(docRef, novosDados);
}