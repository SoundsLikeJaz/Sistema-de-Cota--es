import { useContext, useState } from "react";
import { ProdutosContext } from "../context";
import { Button, Popup, Tabela, TextField } from "../components";
import { atualizarProduto, excluirProduto, inserirProduto } from "../infra/produtos";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaRegEdit } from "react-icons/fa";

const CadastroProdutos = () => {

    const { produtos, setProdutos } = useContext(ProdutosContext);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [objEmEdicao, setObjEmEdicao] = useState(null);
    const [valor, setValor] = useState(null);

    const [hoverEditarIndex, setHoverEditarIndex] = useState(null);
    const [hoverExcluirIndex, setHoverExcluirIndex] = useState(null);

    function gerarData() {
        return produtos.map((produto, index) => (
            <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>
                    <button
                        className="edit"
                        onMouseEnter={() => setHoverEditarIndex(index)}
                        onMouseLeave={() => setHoverEditarIndex(null)}
                        onClick={() => handleEditar(produto)}
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
                        onClick={() => handleExcluir(produto)}
                    >
                        {
                            hoverExcluirIndex === index ? <AiFillDelete /> : <AiOutlineDelete />
                        }
                    </button>
                </td>
            </tr>
        ));
    }

    async function handleCadastrar(event) {
        event.preventDefault();

        let nome = valor;

        if (nome) {
            let novoProduto = {
                nome: nome,
            }

            const id = await inserirProduto(novoProduto);
            novoProduto.id = id;

            setProdutos([...produtos, novoProduto]);
            alert("Produto cadastrado com sucesso!");

            closePopup();
        } else {
            setErrorMessage("Preencha todos os campos!");
        }
    }

    function handleEditar(produto) {
        setObjEmEdicao(produto);
        setValor(produto.nome);
        setMostrarPopup(true);
    }

    async function handleSalvar(event) {
        event.preventDefault();

        let nome = valor;

        if (nome) {
            const produtoAtualizado = {
                nome: nome
            }

            await atualizarProduto(objEmEdicao.id, produtoAtualizado);

            const updatedProdutos = produtos.map(produto => {
                if (produto.id === objEmEdicao.id) {
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

            closePopup();
        } else {
            setErrorMessage("Preencha todos os campos!");
        }
    }

    async function handleExcluir(produto) {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este produto?");
        if (confirmacao) {
            await excluirProduto(produto.id);

            const updatedProdutos = produtos.filter(p => p.id !== produto.id);
            setProdutos(updatedProdutos);

            alert("Produto excluído com sucesso!");

            closePopup();
        }
    }

    function closePopup() {
        setMostrarPopup(false);
        setErrorMessage("");
        setObjEmEdicao(null);
        setValor("");
    }

    return (
        <div className="cadastroProdutos">
            {mostrarPopup && (
                <Popup title="Cadastrar Produto" onClose={closePopup}>
                    <form>
                        <TextField label="Nome" inputType="text" placeholder="Nome do produto" value={valor} onChange={(event) => setValor(event.target.value)} />
                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <br />
                        <div className="button-container">
                            <Button texto={objEmEdicao ? "Salvar alterações" : "Cadastrar produto"} onClick={objEmEdicao ? handleSalvar : handleCadastrar} />
                        </div>
                    </form>
                </Popup>
            )}
            <h1>Produtos</h1>
            <div className="botaoCadastro">
                <Button onClick={() => setMostrarPopup(true)} texto="Cadastrar novo produto" />
            </div>
            <Tabela cabecalho={["Nome", "Editar", "Excluir"]} gerarDados={gerarData} />
        </div>
    );
}

export default CadastroProdutos;