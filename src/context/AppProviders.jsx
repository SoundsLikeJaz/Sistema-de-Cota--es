import { FornecedoresProvider } from "./FornecedoresContext"
import { ProdutosProvider } from "./ProdutosContext"

const AppProviders = ({ children }) => {
    return (
        <ProdutosProvider>
            <FornecedoresProvider>
                {children}
            </FornecedoresProvider>
        </ProdutosProvider>
    );
}

export { AppProviders }