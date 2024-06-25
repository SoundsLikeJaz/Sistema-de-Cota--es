import { useContext, useState } from "react";
import { ProdutosContext } from "../context";
import { Button, DropDown, TextField } from "../components";

const CadastroProdutos = () => {

    const { produtos, setProdutos } = useContext(ProdutosContext);
    const [idEmEdicao, setIdEmEdicao] = useState(0);
    const [editando, setEditando] = useState(false);

    function handleSelect(event) {
        setIdEmEdicao(parseInt(event.target.value));
        let selected = produtos.find(produto => produto.id === parseInt(event.target.value));
        
        document.getElementById("produto").value = selected.nome;
        document.getElementById("marca").value = selected.marca;
    }

    function handleCadastrar(event) {
        event.preventDefault();

        let nome = document.getElementById("produto");
        let marca = document.getElementById("marca");

        if (nome, marca) {
            let novoProduto = {
                id: produtos.length + 1,
                nome: nome.value,
                marca: marca.value,
                cotacoes: []
            }

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

    function handleSalvar(event) {
        event.preventDefault();

        let nome = document.getElementById("produto");
        let marca = document.getElementById("marca");

        if (nome, marca) {
            let updatedProdutos = produtos.map(produto => {
                if (produto.id === idEmEdicao) {
                    return {
                        id: idEmEdicao,
                        nome: nome.value,
                        marca: marca.value
                    }
                } else {
                    return produto;
                }
            });

            setProdutos(updatedProdutos);
            alert("Produto salvo com sucesso!");
            console.log(produtos[idEmEdicao - 1]);

            nome.value = "";
            marca.value = "";
            setEditando(false);
            setIdEmEdicao(0);
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleExcluir(event) {
        event.preventDefault();

        let updatedProdutos = produtos.filter(produto => produto.id !== idEmEdicao);
        setProdutos(updatedProdutos);
        alert("Produto excluído com sucesso!");

        setEditando(false);
        setIdEmEdicao(0);
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
                                <DropDown label="Produtos" options={produtos} disabled="Selecione um Contato" onChange={handleSelect} />
                            </div>
                        </div>
                    )}
            </form>
        </div>
    );
}

export default CadastroProdutos;