import { createContext, useState } from "react";

export const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {
    const [fornecedores, setFornecedores] = useState([]);

    return (
        <FornecedoresContext.Provider value={{ fornecedores, setFornecedores }}>
            {children}
        </FornecedoresContext.Provider>
    );
}