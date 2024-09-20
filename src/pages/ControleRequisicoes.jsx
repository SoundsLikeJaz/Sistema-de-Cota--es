import { useContext, useState } from "react";
import { FornecedoresContext, ProdutosContext, RequisicoesContext } from "../context";
import { Button, DropDown, ListaControleRequisicoes, ListarCotacoes, Popup, TextField } from "../components";
import { atualizarRequisicao } from "../infra/requisicoes";

export default function ControleRequisicoes() {

    const { requisicoes, setRequisicoes } = useContext(RequisicoesContext);
    const { produtos } = useContext(ProdutosContext);
    const { fornecedores } = useContext(FornecedoresContext);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [dropdownFornecedoresValue, setDropdownFornecedoresValue] = useState("");
    const [dropdownProdutosValue, setDropdownProdutosValue] = useState("");
    const [data, setData] = useState(new Date().toLocaleDateString("pt-BR"));
    const [valor, setValor] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [objEmEdicao, setObjEmEdicao] = useState(null);
    const [requisicao, setRequisicao] = useState(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);


    function handleCotarRequisicao(requisicao) {
        setMostrarPopup(true);
        setRequisicao(requisicao);
    }

    function handleAbrirAdicaoCotacao() {
        setAdd(true);
        setMostrarPopup(true);
    }

    async function handleAdicionarCotacao(event) {
        event.preventDefault();
        if (!dropdownFornecedoresValue || !data || !valor) {
            setErrorMessage("Preencha todos os campos");
            return;
        }

        const novaCotacao = {
            id: requisicao.cotacoes.length + 1,
            fornecedorId: dropdownFornecedoresValue,
            data,
            valor
        };

        if (requisicao.produtoId === "naoCadastrado" && dropdownProdutosValue) {
            novaCotacao.produtoId = dropdownProdutosValue;
        } else if (requisicao.produtoId === "naoCadastrado" && !dropdownProdutosValue) {
            setErrorMessage("Selecione um produto equivalente ao requisitado.");
            return;
        } else {
            novaCotacao.produtoId = requisicao.produtoId;
        }

        requisicao.cotacoes.push(novaCotacao);

        const novasRequisicoes = requisicoes.map(r => {
            if (r.id === requisicao.id) {
                return requisicao;
            }
            return r;
        });

        setRequisicoes(novasRequisicoes);
        await atualizarRequisicao(requisicao.id, requisicao);
        closePopup();

    }

    function handleAbrirEdicaoCotacao(cotacao) {
        setEdit(true);
        setMostrarPopup(true);
        setObjEmEdicao(cotacao);
        setDropdownFornecedoresValue(cotacao.fornecedorId);
        setData(cotacao.data);
        setValor(Number(cotacao.valor));

        if (requisicao.produtoId === "naoCadastrado") {
            setDropdownProdutosValue(cotacao.produtoId);
        }
    }

    async function handleEditarCotacao(event) {
        event.preventDefault();
        if (!dropdownFornecedoresValue || !data || !valor) {
            setErrorMessage("Preencha todos os campos");
            return;
        }

        const cotacaoEditada = {
            id: objEmEdicao.id,
            fornecedorId: dropdownFornecedoresValue,
            data,
            valor
        };

        if (requisicao.produtoId === "naoCadastrado" && dropdownProdutosValue) {
            cotacaoEditada.produtoId = dropdownProdutosValue;
        } else if (requisicao.produtoId === "naoCadastrado" && !dropdownProdutosValue) {
            setErrorMessage("Selecione um produto equivalente ao requisitado.");
            return;
        } else {
            cotacaoEditada.produtoId = requisicao.produtoId;
        }

        requisicao.cotacoes = requisicao.cotacoes.map(cotacao => {
            if (cotacao.id === objEmEdicao.id) {
                return cotacaoEditada;
            }
            return cotacao;
        });

        const novasRequisicoes = requisicoes.map(r => {
            if (r.id === requisicao.id) {
                return requisicao;
            }
            return r;
        });

        setRequisicoes(novasRequisicoes);
        await atualizarRequisicao(requisicao.id, requisicao);
        closePopup();
    }

    function closePopup() {
        setDropdownFornecedoresValue("");
        setDropdownProdutosValue("");
        setData("");
        setValor(null);
        setErrorMessage("");
        setRequisicao(null);
        setObjEmEdicao(null);
        setMostrarPopup(false);
        setAdd(false);
        setEdit(false);
        setObjEmEdicao("");
    }

    return (
        <div className="controleRequisicoes">
            {mostrarPopup && (
                <Popup onClose={closePopup} title="Cotações">
                    {add || edit ? (
                        <form className="cotacoesForm">
                            {requisicao.produtoId === "naoCadastrado" && (
                                <DropDown
                                    label="Produto equivalente"
                                    value={dropdownProdutosValue}
                                    onChange={(event) => setDropdownProdutosValue(event.target.value)}
                                    options={produtos}
                                    disabled="Selecione um produto"
                                />
                            )}
                            <DropDown
                                label="Fornecedor"
                                value={dropdownFornecedoresValue}
                                onChange={(event) => setDropdownFornecedoresValue(event.target.value)}
                                options={fornecedores}
                                disabled="Selecione um fornecedor"
                            />
                            <TextField
                                label="Data"
                                inputType="date"
                                id="data"
                                value={data}
                                onChange={(event) => setData(event.target.value)}
                                placeholder="dd/mm/aaaa"
                            />
                            <TextField
                                label="Valor"
                                type="number"
                                id="valor"
                                value={valor}
                                onChange={(event) => setValor(event.target.value)}
                                placeholder="R$ 0,00"
                            />
                            <div className="button-container">
                                {objEmEdicao ? (
                                    <Button texto="Editar cotação" onClick={handleEditarCotacao} />
                                ) : (
                                    <Button texto="Adicionar cotação" onClick={handleAdicionarCotacao} />
                                )}

                            </div>
                            {errorMessage && <p style={{ color: "red", textAlign: "center", fontWeight: "bold", marginTop: "1rem", fontSize: "1.2rem" }}>{errorMessage}</p>}
                        </form>
                    ) : (
                        <div className="cotacoesListaWrapper">
                            <ListarCotacoes requisicao={requisicao} requisicoes={requisicoes} setRequisicoes={setRequisicoes} editor={handleAbrirEdicaoCotacao} />
                            {requisicao.cotacoes.length < 3 && (
                                <div className="buttonContainer">
                                    <Button texto="Adicionar cotação" onClick={handleAbrirAdicaoCotacao} />
                                </div>
                            )}
                        </div>
                    )}

                </Popup>
            )}
            <h1>Controle de Requisições</h1>
            <ListaControleRequisicoes requisicoes={requisicoes} editor={handleCotarRequisicao} />
        </div>
    );
}