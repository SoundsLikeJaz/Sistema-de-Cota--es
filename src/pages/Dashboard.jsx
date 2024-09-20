import { UsuariosContext } from "../context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    CadastroContatos,
    CadastroFornecedores,
    CadastroProdutos,
    CadastroRequisicao, ControleRequisicoes, ControleUsuarios, Entrar,
    Home,
    Layout
} from "./index.js";
import { useContext } from "react";

const Dashboard = () => {

    const { usuario } = useContext(UsuariosContext);

    function definirRotas() {
        if (usuario?.id && usuario.isAdmin) {
            return (
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="/fornecedores" element={<CadastroFornecedores />} />
                    <Route path="/contatos" element={<CadastroContatos />} />
                    <Route path="/produtos" element={<CadastroProdutos />} />
                    <Route path="/controle-requisicoes" element={<ControleRequisicoes />} />
                    <Route path="/controle-usuarios" element={<ControleUsuarios />} />
                    <Route path="*" element={<Home />} />
                </Route>
            );
        } else if (!usuario?.isAdmin && usuario?.id) {
            return (
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="/cadastro-requisicao" element={<CadastroRequisicao />} />
                    <Route path="*" element={<Home />} />
                </Route>
            );
        } else if (!usuario?.id) {
            return (
                <>
                    <Route index element={<Entrar />} />
                    <Route path="*" element={<Home />} />
                </>
            );
        }
    }

    return (
        <Router>
            <Routes>
                {definirRotas()}
            </Routes>
        </Router>
    );
}

export default Dashboard;