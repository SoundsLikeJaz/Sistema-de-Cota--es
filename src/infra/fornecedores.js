import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirFornecedor(novoFornecedor) {
    const docRef = await addDoc(collection(db, "fornecedores"), novoFornecedor);
    return docRef.id;
}

export async function listarFornecedores() {
    let retorno;
    await getDocs(collection(db, "fornecedores"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function excluirFornecedor(id) {
    await deleteDoc(doc(db, "fornecedores", id));
}

export async function atualizarFornecedor(id, novosDados) {
    const docRef = doc(db, "fornecedores", id);
    await updateDoc(docRef, novosDados);
}