import { FornecedoresProvider } from "./FornecedoresContext"
import { ProdutosProvider } from "./ProdutosContext"
import { RequisicoesProvider } from "./RequisicoesContext";
import { UsuariosProvider } from "./UsuariosContext";

const AppProviders = ({ children }) => {
    return (
        <UsuariosProvider>
            <ProdutosProvider>
                <FornecedoresProvider>
                    <RequisicoesProvider>
                        {children}
                    </RequisicoesProvider>
                </FornecedoresProvider>
            </ProdutosProvider>
        </UsuariosProvider>
    );
}

export { AppProviders }