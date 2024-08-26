import { useContext } from "react";
import { deslogarUsuario } from "../infra/usuarios";
import { UsuariosContext } from "../context";

const CadastroSolicitacaoCotacao = () => {

    const { setUsuario } = useContext(UsuariosContext);

    async function handleClick() {
        const usuario = await deslogarUsuario();
        setUsuario(usuario);
    }

    return (
        <div>
            <h1>Ainda em desenvolvimento</h1>
            <button onClick={handleClick}>Deslogar</button>
        </div>
    );
}

export default CadastroSolicitacaoCotacao;