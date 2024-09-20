import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
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

export async function listarUsuarios() {
    let retorno;
    await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });

        retorno = retorno.filter(c => !c.isAdmin);

        return retorno;
    }

export async function excluirUsuario(id) {
    await deleteDoc(doc(db, "users", id));
}

export async function atualizarUsuario(id, novosDados) {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, novosDados);
}