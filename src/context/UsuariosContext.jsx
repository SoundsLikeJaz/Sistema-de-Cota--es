import { createContext, useState } from "react";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    return (
        <UsuariosContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuariosContext.Provider>
    );
}