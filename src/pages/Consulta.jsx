import { useContext } from "react";
import { FornecedoresContext, ProdutosContext } from "../context";

const Consulta = () => {

    const { produtos } = useContext(ProdutosContext);
    const { fornecedores } = useContext(FornecedoresContext);

    const produtosCotados = produtos.filter(produto => produto.cotacoes);

    return (
        <div className="consulta">
            <h1>Consulta</h1>

            {produtosCotados.length > 0 ?
                (<ul className="listagemCotacoes">
                    {produtosCotados.map(produto => {
                        return (
                            <li className="cotacaoCard" key={produto.id}>
                                <div>
                                    <h2 className="cotacaoTitle" >{produto.nome} - {produto.marca}</h2>
                                    <ul>
                                        {produto.cotacoes.map(cotacao => {
                                            let fornecedor = fornecedores.find(fornecedor => fornecedor.id === parseInt(cotacao.fornecedor));
                                            return (
                                                <li key={cotacao.id}>
                                                    <div className="cotacaoInfo">
                                                        <p>Preço: R$ {cotacao.preco}</p>
                                                        <p>Data: {cotacao.data.replaceAll('-', '/')}</p>
                                                        <p>Observações: {cotacao.observacoes}</p>
                                                    </div>
                                                    <div className="cotacaoFornecedor">
                                                        <div className="fornecedorInfo">
                                                            <p>Fornecedor: {fornecedor.nome}</p>
                                                            <p>CNPJ: {fornecedor.cnpj}</p>
                                                            <p>Endereço: {fornecedor.endereco}</p>
                                                        </div>
                                                        <h3>Contatos do Fornecedor</h3>
                                                        <ul className="fornecedorContatos">
                                                            {fornecedor.contatos.map(contato => {
                                                                return (
                                                                    <li key={contato.id}>
                                                                        <p>{contato.tipo}: {contato.contato}</p>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ul>) : <h2>Não há cotações cadastradas.</h2>
            }
        </div>
    );
}

export default Consulta;