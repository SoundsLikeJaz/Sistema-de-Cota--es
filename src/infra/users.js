import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirUsuario(novoUsuario) {
    const userRef = doc(db, "users", novoUsuario.id);
    await setDoc(userRef, novoUsuario);
    return novoUsuario.id;
}

export async function obterUsuario(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirUsuario(id) {
    await deleteDoc(doc(db, "users", id));
}