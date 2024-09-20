import { useEffect, useState } from "react";
import { atualizarUsuario, listarUsuarios } from "../infra/users";
import { Button, Popup, TextField } from "../components";
import { criarContaSemMudarLogin } from "../infra/usuarios";

export default function ControleUsuarios() {

    const [colaboradores, setColaboradores] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [colaboradoresFiltrados, setColaboradoresFiltrados] = useState([]);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        async function carregarColaboradores() {
            const colaboradores = await listarUsuarios();
            setColaboradores(colaboradores);
            setColaboradoresFiltrados(colaboradores);
        }

        carregarColaboradores();
    }, []);

    async function alterarPermissoes(colaborador) {
        colaborador.permitido = !colaborador.permitido;
        await atualizarUsuario(colaborador.id, colaborador);
        const colaboradoresAtualizados = colaboradores.map(c => c.id === colaborador.id ? colaborador : c);
        setColaboradores(colaboradoresAtualizados);
    }

    function filtrarColaboradores(event) {
        const target = event.target;
        setFiltro(target.value);
        setColaboradoresFiltrados(colaboradores.filter(colaborador => colaborador.nome.toLowerCase().includes(target.value.toLowerCase())));
    }

    function closePopup() {
        setMostrarPopup(false);
        setEmail("");
        setSenha("");
        setNome("");
        setAdmin(false);
    }

    async function criarConta(event) {
        event.preventDefault();

        if (!email || !senha || !nome || senha.length < 6) {
            alert("Preencha todos os campos adequadamente para continuar.");
            return;
        }

        const novoUsuario = {
            nome,
            email,
            senha,
            isAdmin: admin,
            permitido: true
        }

        const colaborador = await criarContaSemMudarLogin(novoUsuario);

        if (!colaborador.erro) {
            if (!colaborador.isAdmin) {
                setColaboradores([...colaboradores, colaborador]);
                setColaboradoresFiltrados([...colaboradoresFiltrados, colaborador]);
                closePopup();
            } else {
        closePopup();
            }
        }
    }

    return (
        <div className="controleUsuarios">
            <h1>Controle de Usuários</h1>

            {mostrarPopup && (
                <Popup title="Cadastrar Funcionário" onClose={closePopup}>
                    <form>
                        <TextField label="Nome" inputType="text" placeholder="Nome do funcionário" value={nome} onChange={(event) => setNome(event.target.value)} />
                        <TextField label="Email" inputType="email" placeholder="Email profissional do funcionário" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <TextField label="Senha" inputType="text" placeholder="Senha de acesso" value={senha} onChange={(event) => setSenha(event.target.value)} />

                        <br />
                        <div className="checkboxAdmin">
                            <label htmlFor="admin">Cadastrar como administrador: </label>
                            <input value={admin} onChange={() => setAdmin(!admin)} type="checkbox" name="admin" id="admin" />
                        </div>

                        <br />
                        <div className="button-container">
                            <Button texto="Cadastrar" onClick={criarConta} />
                        </div>
                    </form>
                </Popup>
            )}

            <div className="botaoCadastro">
                <Button onClick={() => setMostrarPopup(true)} texto="Cadastrar novo funcionário" />
            </div>

            <TextField inputType="text" placeholder="Colaborador" label="Pesquisar por nome:" value={filtro} onChange={filtrarColaboradores} />
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Permitido</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradoresFiltrados.map(colaborador => (
                        <tr key={colaborador.id}>
                            <td>{colaborador.nome}</td>
                            <td>{colaborador.email}</td>
                            <td className="checkbox">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={colaborador.permitido}
                                        onChange={() => alterarPermissoes(colaborador)}
                                    />
                                    {colaborador.permitido ? "Permitido" : "Bloqueado"}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}