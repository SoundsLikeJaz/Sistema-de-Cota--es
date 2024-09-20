import { useContext, useState } from "react";
import { ProdutosContext } from "../../context";
import { IoListOutline, IoListSharp } from "react-icons/io5";

export default function ListaControleRequisicoes({ requisicoes, editor }) {

    const { produtos } = useContext(ProdutosContext);

    const [hoverEditarIndex, setHoverEditarIndex] = useState(null);

    function encontrarProduto(id) {
        const produto = produtos.find(produto => produto.id === id);
        return id === "naoCadastrado" ? "Produto não cadastrado" : produto.nome;
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

    function definirStatus(requisicao) {
        if (requisicao.cotacoes.length === 0) {
            return <p className="status aberta">Aberta</p>
        } else if (requisicao.cotacoes.length >= 1 && requisicao.cotacoes.length < 3) {
            return <p className="status emCotacao">Em cotação</p>;
        } else {
            return <p className="status cotada">Cotada</p>;
        }
    }

    function temObservacoes(requisicao) {
        return requisicao.observacoes ? requisicao.observacoes : "Sem observações";
    }

    return (
        <div className="listaRequisicoes">
            {requisicoes?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Produto</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Observações</th>
                            <th>Cotações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requisicoes
                            .sort((a, b) => new Date(a.data) - new Date(b.data))
                            .map((requisicao, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{requisicao.usuarioNome}</td>
                                        <td>{encontrarProduto(requisicao.produtoId)}</td>
                                        <td>{formatarData(requisicao.data)}</td>
                                        <td>{definirStatus(requisicao)}</td>
                                        <td>{temObservacoes(requisicao)}</td>
                                        <td>
                                            <button
                                                className="edit"
                                                onMouseEnter={() => setHoverEditarIndex(index)}
                                                onMouseLeave={() => setHoverEditarIndex(null)}
                                                onClick={() => editor(requisicao)}
                                            >
                                                {
                                                    hoverEditarIndex === index ? <IoListSharp /> : <IoListOutline />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <p>Não há requisições cadastradas.</p>
            )}
        </div>
    );
}