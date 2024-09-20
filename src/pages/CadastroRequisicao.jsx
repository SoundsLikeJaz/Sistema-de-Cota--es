import { useContext, useState } from "react";
import { ProdutosContext, RequisicoesContext, UsuariosContext } from "../context";
import { Button, DropDown, ListarRequisicao, Popup, TextField } from "../components";
import { atualizarRequisicao, inserirRequisicao } from "../infra/requisicoes";

const CadastroRequisicao = () => {

    const { usuario } = useContext(UsuariosContext);

    const { produtos } = useContext(ProdutosContext);

    const [ produtosLista, setProdutosLista ] = useState([...produtos, { id: "naoCadastrado", nome: "Outro"}]);

    const { requisicoes, setRequisicoes } = useContext(RequisicoesContext);

    const [ mostrarPopup, setMostrarPopup ] = useState(false);

    const [ dropdownValue, setDropdownValue ] = useState("");

    const [ errorMessage, setErrorMessage ] = useState("");

    const [ objEmEdicao, setObjEmEdicao ] = useState(null);

    const [ observacoes, setObservacoes ] = useState("");

    function handleSelectChange(event) {
        setDropdownValue(event.target.value);
    }

    async function adicionarRequisicao(event) {
        event.preventDefault();
        const produtoId = dropdownValue;

        if (!produtoId) {
            setErrorMessage("Selecione um produto para fazer a requisição!");
            return;
        }

        const requisicao = {
            usuarioNome: usuario.nome,
            usuarioId: usuario.id,
            produtoId: produtoId,
            observacoes: observacoes,
            cotacoes: [],
            data: new Date().toISOString()
        };

        const requisicaoId = await inserirRequisicao(requisicao);
        requisicao.id = requisicaoId;
        setRequisicoes([...requisicoes, requisicao]);

        closePopup();
    }

    function handleEditarRequisicao(requisicao) {
        setMostrarPopup(true);
        setObjEmEdicao(requisicao);
        setDropdownValue(requisicao.produtoId);
        setObservacoes(requisicao.observacoes);
    }

    async function handleSalvarEdicao(event) {
        event.preventDefault();
        const produtoId = dropdownValue;
        const produto = produtos.find(produto => produto.id === produtoId);

        if (!produto) {
            setErrorMessage("Selecione um produto para fazer a requisição!");
            return;
        }

        const requisicao = {
            ...objEmEdicao,
            produtoId: produtoId,
            observacoes: observacoes,
        };

        const novasRequisicoes = requisicoes.map(r => {
            if (r.id === objEmEdicao.id) {
                return requisicao;
            }
            return r;
        });

        setRequisicoes(novasRequisicoes);

        await atualizarRequisicao(objEmEdicao.id, requisicao);

        closePopup();
    }

    function closePopup() {
        setMostrarPopup(false);
        setErrorMessage("");
        setDropdownValue("");
        setObjEmEdicao(null);
        setObservacoes("");
    }

    return (
        <div className="cadastroRequisicoes">
            <h1>Requisições</h1>
            {mostrarPopup && (
                <Popup title="Adicionar Requisição" onClose={closePopup}>
                    <form>
                        <DropDown label="Produtos" options={produtosLista} disabled="Selecione o produto desejado" value={dropdownValue} onChange={handleSelectChange} />
                        <TextField label="Observações" id="obs" inputType="textarea" placeholder="Detalhes adicionais (opcional)" value={observacoes} onChange={() => setObservacoes(event.target.value)} />
                        <br />
                        <div className="button-container">
                            <Button texto={objEmEdicao ? "Salvar alterações" : "Salvar requisição"} onClick={objEmEdicao ? handleSalvarEdicao : adicionarRequisicao} />
                        </div>
                        {errorMessage && <p style={{color: "red", textAlign: "center", fontWeight: "bold", marginTop: "1rem", fontSize: "1.2rem"}}>{errorMessage}</p>}
                        {observacoes.length >= 50 && <p style={{color: "red", textAlign: "center", fontWeight: "bold", marginTop: "1rem", fontSize: "1.2rem"}}>Limite de 50 caracteres atingido!</p>}
                    </form>
                </Popup>
            )}
            <Button texto="Adicionar Requisição" onClick={() => setMostrarPopup(true)} />
            <ListarRequisicao requisicoes={requisicoes} setRequisicoes={setRequisicoes} editor={handleEditarRequisicao} />
        </div>
    );
}

export default CadastroRequisicao;