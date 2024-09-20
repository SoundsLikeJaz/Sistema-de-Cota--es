import { createContext, useContext, useEffect, useState } from "react";

import { UsuariosContext } from "./UsuariosContext";
import { listarRequisicoes } from "../infra/requisicoes";

export const RequisicoesContext = createContext();

export const RequisicoesProvider = ({ children }) => {
    const [requisicoes, setRequisicoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { usuario } = useContext(UsuariosContext);

    useEffect(() => {
        async function fetchRequisicoes() {
            const listaRequisicoes = await listarRequisicoes(usuario);
            setRequisicoes(listaRequisicoes);
            setLoading(false);
        }
        fetchRequisicoes();
    }, [usuario]);

    return (
        <RequisicoesContext.Provider value={{ requisicoes, setRequisicoes, loading }}>
            {children}
        </RequisicoesContext.Provider>
    );
}