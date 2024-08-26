import { createContext, useEffect, useState } from "react";
import { listarProdutos } from "../infra/produtos";

export const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProdutos() {
            const listaProdutos = await listarProdutos();
            setProdutos(listaProdutos);
            setLoading(false);
        }
        fetchProdutos();
    }, []);

    return (
        <ProdutosContext.Provider value={{ produtos, setProdutos, loading }}>
            {children}
        </ProdutosContext.Provider>
    );
}