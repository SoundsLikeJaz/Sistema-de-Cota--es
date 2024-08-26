import { createContext, useEffect, useState } from "react";
import { listarFornecedores } from "../infra/fornecedores";

export const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFornecedores() {
            const listaFornecedores = await listarFornecedores();
            setFornecedores(listaFornecedores);
            setLoading(false);
        }
        fetchFornecedores();
    }, []);

    return (
        <FornecedoresContext.Provider value={{ fornecedores, setFornecedores, loading }}>
            {children}
        </FornecedoresContext.Provider>
    );
}