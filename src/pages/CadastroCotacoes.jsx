import { useContext, useState } from "react";
import { Button, DropDown, TextField } from "../components";
import { FornecedoresContext, ProdutosContext } from "../context";

const CadastroCotacoes = () => {

    const { produtos, setProdutos } = useContext(ProdutosContext);
    const { fornecedores, setFornecedores } = useContext(FornecedoresContext);

    const [selectedProduto, setSelectedProduto] = useState({});
    const [selectedFornecedor, setSelectedFornecedor] = useState({});
    const [idEmEdicao, setIdEmEdicao] = useState(0);
    const [editando, setEditando] = useState(false);
    const [cotacoes, setCotacoes] = useState([]);

    function gerarCotacoes() {
        let lista = [];
        if (selectedProduto.cotacoes.length > 0 && selectedFornecedor.cotacoes.length > 0) {
            lista = selectedProduto.cotacoes.filter(cotacao => selectedFornecedor.cotacoes.some(c => c.id === cotacao.id));
        } else if(selectedProduto.cotacoes.length > 0) {
            lista = selectedProduto.cotacoes;
        } else if(selectedFornecedor.cotacoes.length > 0) {
            lista = selectedFornecedor.cotacoes;
        } else {
            lista = [];
        }
        setCotacoes(lista);
    }

    function handleSelectProduto(event) {
        let selected = produtos.find(produto => produto.id === parseInt(event.target.value))[0];
        setSelectedProduto(selected);
        setIdEmEdicao(0);
        setEditando(false);
    }

    function handleSelectFornecedor(event) {
        let selected = fornecedores.find(fornecedor => fornecedor.id === parseInt(event.target.value))[0];
        setSelectedFornecedor(selected);
        setIdEmEdicao(0);
        setEditando(false);
    }

    function handleSelectCotacao(event) {
        setIdEmEdicao(parseInt(event.target.value));
    }

    function handleCadastrar(event) {
        event.preventDefault();

        let produto = selectedProduto;
        let fornecedor = selectedFornecedor;
        let preco = document.getElementById("preco");
        let data = document.getElementById("data");
        let observacoes = document.getElementById("observacoes");

        if (produto && fornecedor && preco.value && data.value) {
            produto.cotacoes = produto.cotacoes || [];

            let novaCotacao = {
                id: `${produto.id}-${fornecedor.id}-${Math.floor(Math.random() * 1000)}`,
                produto: produto.id,
                fornecedor: fornecedor.id,
                preco: Number(preco.value),
                data: data.value,
                observacoes: observacoes.value
            };

            let updatedProduto = {
                ...produto,
                cotacoes: [...produto.cotacoes, novaCotacao]
            };

            let updatedProdutos = produtos.map(produto => {
                if (produto.id === updatedProduto.id) {
                    return updatedProduto;
                } else {
                    return produto;
                }
            });

            let updatedFornecedor = {
                ...fornecedor,
                cotacoes: [...fornecedor.cotacoes, novaCotacao]
            }

            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === updatedFornecedor.id) {
                    return updatedFornecedor;
                } else {
                    return fornecedor;
                }
            });

            setFornecedores(updatedFornecedores);
            setProdutos(updatedProdutos);
            alert("Cotação cadastrada com sucesso!");

            preco.value = "";
            data.value = "";
            observacoes.value = "";
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleEditar(event) {
        event.preventDefault();

        gerarCotacoes();
        cotacoes.length > 0 ? setEditando(true) : alert("Não há cotações para editar!");
    }

    function handleSalvar(event) {
        event.preventDefault();

        let produto = selectedProduto;
        let fornecedor = selectedFornecedor;
        let preco = document.getElementById("preco");
        let data = document.getElementById("data");
        let observacoes = document.getElementById("observacoes");

        if (produto && fornecedor && preco.value && data.value) {
            let updatedCotacoes = produto.cotacoes.map(cotacao => {
                if (cotacao.id === idEmEdicao) {
                    return {
                        ...cotacao,
                        fornecedor: fornecedor,
                        preco: Number(preco.value),
                        data: data.value,
                        observacoes: observacoes.value
                    }
                } else {
                    return cotacao;
                }
            });

            let updatedProduto = {
                ...produto,
                cotacoes: updatedCotacoes
            };

            let updatedProdutos = produtos.map(produto => {
                if (produto.id === updatedProduto.id) {
                    return updatedProduto;
                } else {
                    return produto;
                }
            });

            setProdutos(updatedProdutos);
            alert("Cotação salva com sucesso!");

            preco.value = "";
            data.value = "";
            observacoes.value = "";
            setEditando(false);
            setIdEmEdicao(0);
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleExcluir(event) {
        event.preventDefault();

        let produto = selectedProduto;

        if (produto) {
            let updatedCotacoes = produto.cotacoes.filter(cotacao => cotacao.id !== idEmEdicao);

            let updatedProduto = {
                ...produto,
                cotacoes: updatedCotacoes
            };

            let updatedProdutos = produtos.map(produto => {
                if (produto.id === updatedProduto.id) {
                    return updatedProduto;
                } else {
                    return produto;
                }
            });

            setProdutos(updatedProdutos);
            alert("Cotação excluída com sucesso!");

            setEditando(false);
            setIdEmEdicao(0);
        } else {
            alert("Selecione uma cotação!");
        }
    }

    return (
        <div className="cadastroCotacoes">
            <h1>Cadastro de Cotações</h1>
            <form>
                {!editando &&
                    <div className="dropdownWrapper">
                        <DropDown id="produto" label="Produto" options={produtos} disabled="Selecione um produto" onChange={handleSelectProduto} />
                        <DropDown id="fornecedor" label="Fornecedor" options={fornecedores} disabled="Selecione um fornecedor" onChange={handleSelectFornecedor} />
                    </div>
                }
                <TextField id="preco" inputType="number" placeholder="Preço" label="Preço" />
                <TextField id="data" inputType="date" label="Data" />
                <TextField id="observacoes" inputType="textarea" placeholder="Observações" label="Observações" />
                {!editando ?
                    (
                        <div className="botoes">
                            <Button texto="Cadastrar" onClick={handleCadastrar} />
                            <Button texto="Editar" onClick={handleEditar} />
                        </div>
                    )
                    : (
                        <div className="editor">
                            <div className="botoes">
                                <Button texto="Salvar" onClick={handleSalvar} />
                                <Button texto="Excluir" onClick={handleExcluir} />
                            </div>
                            <div className="dropdownWrapper">
                                <DropDown label="Cotações" options={cotacoes} disabled="Selecione uma Cotação" onChange={handleSelectCotacao} />
                            </div>
                        </div>
                    )}
            </form>
        </div>
    );
}

export default CadastroCotacoes;