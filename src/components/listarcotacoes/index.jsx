import { useContext, useState } from "react";
import { FornecedoresContext, ProdutosContext } from "../../context";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { atualizarRequisicao } from "../../infra/requisicoes";

export default function ListarCotacoes({ requisicao, requisicoes, setRequisicoes, editor }) {

    const { produtos } = useContext(ProdutosContext);
    const { fornecedores } = useContext(FornecedoresContext);

    const [hoverEditarIndex, setHoverEditarIndex] = useState(null);
    const [hoverExcluirIndex, setHoverExcluirIndex] = useState(null);

    function encontrarProduto(id) {
        const produto = produtos.find(produto => produto.id === id);
        return id === "naoCadastrado" ? "Produto não cadastrado" : produto.nome;
    }

    function encontrarFornecedor(id) {
        const fornecedor = fornecedores.find(fornecedor => fornecedor.id === id);
        return id === "naoCadastrado" ? "Fornecedor desconhecido" : fornecedor.nome;
    }

    function formatarData(data) {
        const dataObj = new Date(data);
        const dataCorrigida = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000);

        return dataCorrigida.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    async function handleExcluirCotacao(cotacao) {
        const confirmacao = window.confirm("Tem certeza que deseja excluir esta cotação?");
        if (confirmacao) {
            const novasCotacoes = requisicao.cotacoes.filter(c => c.id !== cotacao.id);
            requisicao.cotacoes = novasCotacoes;

            const novasRequisicoes = requisicoes.map(r => {
                if (r.id === requisicao.id) {
                    return requisicao;
                }
                return r;
            });
            setRequisicoes(novasRequisicoes);
            await atualizarRequisicao(requisicao.id, requisicao);
        }
    }

    return (
        <div className="listaRequisicoes listaCotacoes">
            {requisicao.cotacoes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {requisicao.produtoId === "naoCadastrado" && <th>Produto</th>}
                            <th>Fornecedor</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requisicao.cotacoes
                            .sort((a, b) => new Date(a.data) - new Date(b.data))
                            .map((cotacao, index) => {
                                return (
                                    <tr key={index}>
                                        {requisicao.produtoId === "naoCadastrado" && <td>{encontrarProduto(cotacao.produtoId)}</td>}
                                        <td>{encontrarFornecedor(cotacao.fornecedorId)}</td>
                                        <td>R$ {cotacao.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td>{formatarData(cotacao.data)}</td>
                                        <td>
                                            <button
                                                className="edit"
                                                onMouseEnter={() => setHoverEditarIndex(index)}
                                                onMouseLeave={() => setHoverEditarIndex(null)}
                                                onClick={() => editor(cotacao)}
                                            >
                                                {
                                                    hoverEditarIndex === index ? <FaEdit /> : <FaRegEdit />
                                                }
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="delete"
                                                onMouseEnter={() => setHoverExcluirIndex(index)}
                                                onMouseLeave={() => setHoverExcluirIndex(null)}
                                                onClick={() => handleExcluirCotacao(cotacao)}
                                            >
                                                {
                                                    hoverExcluirIndex === index ? <AiFillDelete /> : <AiOutlineDelete />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <p>Não há cotações cadastradas.</p>
            )}
        </div>
    );
}