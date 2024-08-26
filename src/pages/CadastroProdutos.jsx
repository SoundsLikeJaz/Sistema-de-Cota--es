import { useContext, useState } from "react";
import { ProdutosContext } from "../context";
import { Button, DropDown, TextField } from "../components";
import { atualizarProduto, excluirProduto, inserirProduto } from "../infra/produtos";

const CadastroProdutos = () => {

    const { produtos, setProdutos } = useContext(ProdutosContext);
    const [idEmEdicao, setIdEmEdicao] = useState("");
    const [editando, setEditando] = useState(false);

    function handleSelect(event) {
        setIdEmEdicao(event.target.value);
        let selected = produtos.find(produto => produto.id === event.target.value);
        
        document.getElementById("produto").value = selected.nome;
        document.getElementById("marca").value = selected.marca;
    }

    async function handleCadastrar(event) {
        event.preventDefault();

        let nome = document.getElementById("produto");
        let marca = document.getElementById("marca");

        if (nome, marca) {
            let novoProduto = {
                nome: nome.value,
                marca: marca.value,
                cotacoes: []
            }

            await inserirProduto(novoProduto);

            setProdutos([...produtos, novoProduto]);
            alert("Produto cadastrado com sucesso!");

            nome.value = "";
            marca.value = "";
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleEditar(event) {
        event.preventDefault();

        setEditando(true);
    }

    async function handleSalvar(event) {
        event.preventDefault();

        let nome = document.getElementById("produto");
        let marca = document.getElementById("marca");

        if (nome && marca) {
            const produtoAtualizado = {
                nome: nome.value,
                marca: marca.value
            }

            await atualizarProduto(idEmEdicao, produtoAtualizado);

            const updatedProdutos = produtos.map(produto => {
                if (produto.id === idEmEdicao) {
                    return {
                        ...produto,
                        ...produtoAtualizado
                    }
                } else {
                    return produto;
                }
            });

            setProdutos(updatedProdutos);
            alert("Produto salvo com sucesso!");

            nome.value = "";
            marca.value = "";
            setEditando(false);
            setIdEmEdicao("");
        } else {
            alert("Preencha todos os campos!");
        }
    }

    async function handleExcluir(event) {
        event.preventDefault();

        let updatedProdutos = produtos.filter(produto => produto.id !== idEmEdicao);
        await excluirProduto(idEmEdicao);
        setProdutos(updatedProdutos);
        alert("Produto excluído com sucesso!");

        setEditando(false);
        setIdEmEdicao("");
    }

    return (
        <div className="cadastroProdutos">
            <h1>Cadastro de Produtos</h1>
            <form>
                <TextField id="produto" inputType="text" placeholder="Nome do Produto" label="Produto" />
                <TextField id="marca" inputType="text" placeholder="Marca" label="Marca" />
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
                                <DropDown label="Produtos" options={produtos} disabled="Selecione um Produto" onChange={handleSelect} />
                            </div>
                        </div>
                    )}
            </form>
        </div>
    );
}

export default CadastroProdutos;