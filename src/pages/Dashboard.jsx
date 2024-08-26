import { UsuariosContext } from "../context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    CadastroContatos,
    CadastroCotacoes,
    CadastroFornecedores,
    CadastroProdutos,
    CadastroSolicitacaoCotacao,
    Consulta, Entrar,
    Home,
    Layout
} from "./index.js";
import {useContext} from "react";

const Dashboard = () => {

    const { usuario } = useContext(UsuariosContext);

    function isAdmin() {
        console.log(usuario);
        if (usuario?.isAdmin) {
            return <Layout />;
        } else {
            return <CadastroSolicitacaoCotacao />;
        }
    }

    return (
            <Router>
                <Routes>
                    <Route path="/" element={usuario?.id ? isAdmin() : <Entrar />} >
                        <Route index element={<Home />} />
                        <Route path="/cadastro-fornecedores" element={<CadastroFornecedores />} />
                        <Route path="/cadastro-contatos" element={<CadastroContatos />} />
                        <Route path="/cadastro-produtos" element={<CadastroProdutos />} />
                        <Route path="/cadastro-cotacoes" element={<CadastroCotacoes />} />
                        <Route path="/consulta" element={<Consulta />} />
                    </Route>
                </Routes>                
            </Router>
    );
}

export default Dashboard;