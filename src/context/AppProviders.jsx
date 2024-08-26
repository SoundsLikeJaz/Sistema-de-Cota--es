import { FornecedoresProvider } from "./FornecedoresContext"
import { ProdutosProvider } from "./ProdutosContext"
import {UsuariosProvider} from "./UsuariosContext";

const AppProviders = ({ children }) => {
    return (
        <UsuariosProvider>
            <ProdutosProvider>
                <FornecedoresProvider>
                    {children}
                </FornecedoresProvider>
            </ProdutosProvider>
        </UsuariosProvider>
    );
}

export { AppProviders }