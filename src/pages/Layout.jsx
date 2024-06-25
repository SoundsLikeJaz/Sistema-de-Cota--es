import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav>
                <ul className="menu">
                    <li>
                        <Link to="/">Início</Link>
                    </li>
                    <li>
                        <Link to="/cadastro-fornecedores">Cadastro de Fornecedores</Link>
                    </li>
                    <li>
                        <Link to="/cadastro-contatos">Cadastro de Contatos</Link>
                    </li>
                    <li>
                        <Link to="/cadastro-produtos">Cadastro de Produtos</Link>
                    </li>
                    <li>
                        <Link to="/cadastro-cotacoes">Cadastro de Cotações</Link>
                    </li>
                    <li>
                        <Link to="/consulta">Consulta</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;