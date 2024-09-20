import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UsuariosContext } from "../context";
import { deslogarUsuario } from "../infra/usuarios";
import { FaSignOutAlt } from "react-icons/fa";

const Layout = () => {

    const { usuario, setUsuario } = useContext(UsuariosContext);

    const navigate = useNavigate();

    async function sair() {
        const usuario = await deslogarUsuario();
        setUsuario(usuario);
        navigate("/");
    }

    function definirLinks() {
        if (usuario?.isAdmin) {
            return (
                <>
                    <li>
                        <Link to="/fornecedores">Fornecedores</Link>
                    </li>
                    <li>
                        <Link to="/contatos">Contatos</Link>
                    </li>
                    <li>
                        <Link to="/produtos">Produtos</Link>
                    </li>
                    <li>
                        <Link to="/controle-requisicoes">Requisições</Link>
                    </li>
                    <li>
                        <Link to="/controle-usuarios">Usuários</Link>
                    </li>
                </>
            );
        } else if (!usuario?.isAdmin && usuario?.id) {
            return (
                <>
                    <li>
                        <Link to="/cadastro-requisicao">Requisitar Compra</Link>
                    </li>
                </>
            );
        }
    }

    return (
        <div>
            <nav>
                <ul className="menu">
                    <li>
                        <Link to="/">Início</Link>
                    </li>
                    {definirLinks()}
                    <li onClick={sair} style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}>
                        <FaSignOutAlt />
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;