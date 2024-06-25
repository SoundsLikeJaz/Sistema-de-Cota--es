import { useContext, useState } from "react";
import { Button, DropDown, TextField } from "../components";
import { FornecedoresContext } from "../context";

const CadastroFornecedores = () => {

    const { fornecedores, setFornecedores } = useContext(FornecedoresContext);
    const [ idEmEdicao, setIdEmEdicao ] = useState(0);
    const [ editando, setEditando ] = useState(false);

    function handleSelect(event) {
        let selected = fornecedores.find(fornecedor => fornecedor.id === parseInt(event.target.value));
        setIdEmEdicao(selected.id);

        let nome = document.getElementById("nome");
        let cnpj = document.getElementById("cnpj");
        let endereco = document.getElementById("endereco");

        nome.value = selected.nome;
        cnpj.value = selected.cnpj;
        endereco.value = selected.endereco;
    }

    function handleCadastrar(event) {
        event.preventDefault();

        let nome = document.getElementById("nome");
        let cnpj = document.getElementById("cnpj");
        let endereco = document.getElementById("endereco");

        if (nome, cnpj, endereco) {
            let fornecedor = {
                id: fornecedores.length + 1,
                nome: nome.value,
                cnpj: cnpj.value,
                endereco: endereco.value,
                contatos: [],
                cotacoes: []
            }

            setFornecedores([...fornecedores, fornecedor]);
            alert("Fornecedor cadastrado com sucesso!");

            nome.value = "";
            cnpj.value = "";
            endereco.value = "";
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

        let nome = document.getElementById("nome");
        let cnpj = document.getElementById("cnpj");
        let endereco = document.getElementById("endereco");

        if (nome, cnpj, endereco) {
            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === idEmEdicao) {
                    return {
                        ...fornecedor,
                        nome: nome.value,
                        cnpj: cnpj.value,
                        endereco: endereco.value
                    }
                } else {
                    return fornecedor;
                }
            });

            setFornecedores(updatedFornecedores);
            alert("Fornecedor atualizado com sucesso!");

            nome.value = "";
            cnpj.value = "";
            endereco.value = "";
            setIdEmEdicao(0);
            setEditando(false);
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleExcluir(event) {
        event.preventDefault();

        let updatedFornecedores = fornecedores.filter(fornecedor => fornecedor.id !== idEmEdicao);
        setFornecedores(updatedFornecedores);
        alert("Fornecedor excluído com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("cnpj").value = "";
        document.getElementById("endereco").value = "";
        setIdEmEdicao(0);
        setEditando(false);
    }

    return (
        <div className="cadastroFornecedores">
            <h1>Cadastro de Fornecedores</h1>
            <form>
                <TextField id="nome" inputType="text" placeholder="Nome" label="Nome" />
                <TextField id="cnpj" inputType="text" placeholder="CNPJ" label="CNPJ" />
                <TextField id="endereco" inputType="textarea" placeholder="Endereço" label="Endereço" />
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
                                <DropDown label="Fornecedor" options={fornecedores} disabled="Selecione um Fornecedor" onChange={handleSelect} />
                            </div>
                        </div>
                    )}
            </form>
        </div>
    );
}

export default CadastroFornecedores;