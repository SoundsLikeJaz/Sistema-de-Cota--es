import { useContext, useEffect } from "react";
import { UsuariosContext } from "../context";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { usuario } = useContext(UsuariosContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!usuario?.id) {
            navigate("/");
        }
    }, [usuario]);
    return (
        <div className="home">
            <h1>ACME</h1>
            <h2>Sistema de cadastro de produtos e cotações da empresa ACME</h2>
        </div>
    );
}

export default Home;