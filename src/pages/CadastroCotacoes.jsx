import {useContext, useEffect, useState} from "react";
import { Button, DropDown, TextField } from "../components";
import { FornecedoresContext, ProdutosContext } from "../context";

const CadastroCotacoes = () => {

    const { produtos, setProdutos } = useContext(ProdutosContext);
    const { fornecedores, setFornecedores } = useContext(FornecedoresContext);

    const [selectedProduto, setSelectedProduto] = useState({});
    const [selectedFornecedor, setSelectedFornecedor] = useState({});
    const [idEmEdicao, setIdEmEdicao] = useState("");
    const [editando, setEditando] = useState(false);
    const [cotacoes, setCotacoes] = useState([]);

    useEffect(() => {
        if (editando) {
            gerarCotacoes();
        }
    }, [editando]);

    useEffect(() => {
        if (cotacoes.length > 0) {
            setEditando(true);
        } else if (editando) {
            alert("Não há cotações para editar!");
            setEditando(false);
        }
    }, [cotacoes]);

    function gerarCotacoes() {
        let lista = [];
        const produtoCotacoes = selectedProduto.cotacoes?.length > 0 ? [...selectedProduto.cotacoes] : [];
        const fornecedorCotacoes = selectedFornecedor.cotacoes?.length > 0 ? [...selectedFornecedor.cotacoes] : [];

        if (produtoCotacoes.length > 0 && fornecedorCotacoes.length > 0) {
            lista = produtoCotacoes.filter(cotacao => fornecedorCotacoes.some(c => c.id === cotacao.id));
        } else if (produtoCotacoes.length > 0) {
            lista = produtoCotacoes;
        } else if (fornecedorCotacoes.length > 0) {
            lista = fornecedorCotacoes;
        } else {
            lista = [];
        }

        setCotacoes(lista);
    }

    function handleSelectProduto(event) {
        let selected = produtos.find(produto => produto.id === parseInt(event.target.value));
        setSelectedProduto(selected);
        setIdEmEdicao("");
        setEditando(false);
    }

    function handleSelectFornecedor(event) {
        let selected = fornecedores.find(fornecedor => fornecedor.id === parseInt(event.target.value));
        setSelectedFornecedor(selected);
        setIdEmEdicao("");
        setEditando(false);
    }

    function handleSelectCotacao(event) {
        const cotacaoId = event.target.value;
        setIdEmEdicao(cotacaoId);

        const selectedCotacao = cotacoes.find(c => c.id === cotacaoId);

        if (selectedCotacao) {
            let preco = document.getElementById("preco");
            let data = document.getElementById("data");
            let observacoes = document.getElementById("observacoes");

            preco.value = selectedCotacao.preco;
            data.value = selectedCotacao.data;
            observacoes.value = selectedCotacao.observacoes;
        }
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
                nome: `${produto.nome} vendido por ${fornecedor.nome} - ${data.value}`,
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
            setSelectedFornecedor(updatedFornecedor);
            setSelectedProduto(updatedProduto);
            setProdutos(updatedProdutos);
            alert("Cotação cadastrada com sucesso!");

            preco.value = "";
            data.value = "";
            observacoes.value = "";
        } else {
            alert("Preencha todos os campos!");
            console.log(produto, fornecedor, preco.value, data.value);
        }
    }

    function handleEditar(event) {
        event.preventDefault();
        gerarCotacoes();
    }

    function handleSalvar(event) {
        event.preventDefault();

        let selectedCotacao = cotacoes.find(c => c.id === idEmEdicao);
        let produto = produtos.find(produto => produto.id === selectedCotacao.produto);
        let fornecedor = fornecedores.find(fornecedor => fornecedor.id === selectedCotacao.produto);

        let preco = document.getElementById("preco");
        let data = document.getElementById("data");
        let observacoes = document.getElementById("observacoes");

        if (produto && fornecedor && preco.value && data.value) {

            let updatedCotacao = {
                id: selectedCotacao.id,
                produto: selectedCotacao.produto,
                fornecedor: selectedCotacao.fornecedor,
                nome: `${produto.nome} vendido por ${fornecedor.nome} - ${data.value}`,
                preco: Number(preco.value),
                data: data.value,
                observacoes: observacoes.value
            }

            let updatedProdutoCotacoes = produto.cotacoes.map(cotacao => {
                if (cotacao.id === idEmEdicao) {
                    return updatedCotacao;
                } else {
                    return cotacao;
                }
            });

            let updatedFornecedorCotacoes = fornecedor.cotacoes.map(cotacao => {
                if (cotacao.id === idEmEdicao) {
                    return updatedCotacao;
                } else {
                    return cotacao;
                }
            });

            let updatedProduto = {
                ...produto,
                cotacoes: updatedProdutoCotacoes
            };

            let updatedFornecedor = {
                ...fornecedor,
                cotacoes: updatedFornecedorCotacoes
            }

            let updatedProdutos = produtos.map(produto => {
                if (produto.id === updatedProduto.id) {
                    return updatedProduto;
                } else {
                    return produto;
                }
            });

            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === updatedFornecedor.id) {
                    return updatedFornecedor;
                } else {
                    return fornecedor;
                }
            })

            setFornecedores(updatedFornecedores);
            setProdutos(updatedProdutos);
            alert("Cotação salva com sucesso!");

            preco.value = "";
            data.value = "";
            observacoes.value = "";
            setEditando(false);
            setIdEmEdicao("");
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleExcluir(event) {
        event.preventDefault();

        let selectedCotacao = cotacoes.find(c => c.id === idEmEdicao);
        let produto = produtos.find(produto => produto.id === selectedCotacao.produto);
        let fornecedor = fornecedores.find(fornecedor => fornecedor.id === selectedCotacao.produto);

        if (produto && fornecedor) {
            let updatedProdutoCotacoes = produto.cotacoes.filter(cotacao => cotacao.id !== idEmEdicao);
            let updatedFornecedorCotacoes = fornecedor.cotacoes.filter(cotacao => cotacao.id !== idEmEdicao);

            let updatedProduto = {
                ...produto,
                cotacoes: updatedProdutoCotacoes
            };

            let updatedFornecedor = {
                ...fornecedor,
                cotacoes: updatedFornecedorCotacoes
            };

            let updatedProdutos = produtos.map(produto => {
                if (produto.id === updatedProduto.id) {
                    return updatedProduto;
                } else {
                    return produto;
                }
            });

            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === updatedFornecedor.id) {
                    return updatedFornecedor;
                } else {
                    return fornecedor;
                }
            });

            setProdutos(updatedProdutos);
            setFornecedores(updatedFornecedores);
            alert("Cotação excluída com sucesso!");

            setEditando(false);
            setIdEmEdicao("");
        } else {
            alert("Selecione uma cotação!");
        }
    }

    return (
        <div className="cadastroCotacoes">
            <h1>Cadastro de Cotações</h1>
            <form>
                {editando === false &&
                    <div className="dropdownWrapper">
                        <DropDown id="produto" label="Produto" options={produtos} disabled="Selecione um produto" onChange={handleSelectProduto} />
                        <DropDown id="fornecedor" label="Fornecedor" options={fornecedores} disabled="Selecione um fornecedor" onChange={handleSelectFornecedor} />
                    </div>
                }
                <TextField id="preco" inputType="number" placeholder="Preço" label="Preço" />
                <TextField id="data" inputType="date" label="Data" />
                <TextField id="observacoes" inputType="textarea" placeholder="Observações" label="Observações" />
                {editando === false ?
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