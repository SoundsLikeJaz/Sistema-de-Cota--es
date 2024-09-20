import { useContext, useState } from "react";
import { FornecedoresContext } from "../context";
import { Button, DropDown, TextField } from "../components";
import { atualizarFornecedor } from "../infra/fornecedores";

const CadastroContatos = () => {

    const { fornecedores, setFornecedores } = useContext(FornecedoresContext);
    const [selectedFornecedor, setSelectedFornecedor] = useState({});
    const [idEmEdicao, setIdEmEdicao] = useState("");
    const [editando, setEditando] = useState(false);
    const [dropdownFornecedorValue, setDropdownFornecedorValue] = useState("");
    const [dropdownContatoValue, setDropdownContatoValue] = useState("");

    function handleSelect(event) {
        let selected = fornecedores.find(fornecedor => fornecedor.id === event.target.value);
        setDropdownFornecedorValue(event.target.value);
        setSelectedFornecedor(selected);
    }

    async function handleCadastrar(event) {
        event.preventDefault();

        let nomeContato = document.getElementById("nomeContato");
        let tipo = document.getElementById("tipo");
        let contato = document.getElementById("contato");

        if (nomeContato && tipo && contato) {
            let novoContato = {
                id: (selectedFornecedor.contatos?.length || 0) + 1,
                nome: nomeContato.value,
                tipo: tipo.value,
                contato: contato.value
            }

            let updatedFornecedor = {
                ...selectedFornecedor,
                contatos: [...(selectedFornecedor.contatos || []), novoContato]
            }

            await atualizarFornecedor(selectedFornecedor.id, updatedFornecedor);

            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === selectedFornecedor.id) {
                    return updatedFornecedor;
                } else {
                    return fornecedor;
                }
            });

            setFornecedores(updatedFornecedores);
            setSelectedFornecedor(updatedFornecedor);
            alert("Contato cadastrado com sucesso!");

            nomeContato.value = "";
            tipo.value = "";
            contato.value = "";
            setDropdownFornecedorValue("");
            setSelectedFornecedor({});
        } else {
            alert("Preencha todos os campos!");
        }
    }

    function handleEditar(event) {
        event.preventDefault();

        setEditando(true);
    }

    function handleSelectContato(event) {
        let selected = selectedFornecedor.contatos.find(contato => contato.id === parseInt(event.target.value));
        setIdEmEdicao(selected.id);
        setDropdownContatoValue(event.target.value);

        let nomeContato = document.getElementById("nomeContato");
        let tipo = document.getElementById("tipo");
        let contato = document.getElementById("contato");

        nomeContato.value = selected.nome;
        tipo.value = selected.tipo;
        contato.value = selected.contato;
    }

    async function handleSalvar(event) {
        event.preventDefault();

        let nomeContato = document.getElementById("nomeContato");
        let tipo = document.getElementById("tipo");
        let contatoValor = document.getElementById("contato");

        if (nomeContato && tipo && contatoValor) {
            let updatedContatos = selectedFornecedor.contatos.map(contato => {
                if (contato.id === idEmEdicao) {
                    return {
                        id: idEmEdicao,
                        nome: nomeContato.value,
                        tipo: tipo.value,
                        contato: contatoValor.value
                    }
                } else {
                    return contato;
                }
            });

            let updatedFornecedor = {
                ...selectedFornecedor,
                contatos: updatedContatos
            }

            await atualizarFornecedor(selectedFornecedor.id, updatedFornecedor);

            let updatedFornecedores = fornecedores.map(fornecedor => {
                if (fornecedor.id === selectedFornecedor.id) {
                    return updatedFornecedor;
                } else {
                    return fornecedor;
                }
            });

            setFornecedores(updatedFornecedores);
            setSelectedFornecedor(updatedFornecedor);
            alert("Contato editado com sucesso!");

            setEditando(false);
            setIdEmEdicao(0);
            nomeContato.value = "";
            contatoValor.value = "";
            tipo.value = "";
            setDropdownFornecedorValue("");
            setDropdownContatoValue("");
            setSelectedFornecedor({});
        } else {
            alert("Preencha todos os campos!");
        }
    }

    async function handleExcluir(event) {
        event.preventDefault();

        let updatedContatos = selectedFornecedor.contatos.filter(contato => contato.id !== idEmEdicao);

        let updatedFornecedor = {
            ...selectedFornecedor,
            contatos: updatedContatos
        }

        await atualizarFornecedor(selectedFornecedor.id, updatedFornecedor);

        document.getElementById("nomeContato").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("contato").value = "";

        let updatedFornecedores = fornecedores.map(fornecedor => {
            if (fornecedor.id === selectedFornecedor.id) {
                return updatedFornecedor;
            } else {
                return fornecedor;
            }
        });

        setFornecedores(updatedFornecedores);
        setSelectedFornecedor(updatedFornecedor);
        alert("Contato excluído com sucesso!");

        setEditando(false);
        setIdEmEdicao(0);
        setDropdownFornecedorValue("");
        setDropdownContatoValue("");
        setSelectedFornecedor({});
    }

    return (
        <div className="cadastroContatos">
            <h1>Cadastro de Contatos</h1>

            <div className="dropdownWrapper">
                <DropDown label="Fornecedor" options={fornecedores} disabled="Selecione um Fornecedor" value={dropdownFornecedorValue} onChange={handleSelect} />
            </div>
            {selectedFornecedor.id && (
                <form>
                    <TextField id="nomeContato" inputType="text" placeholder="Nome do Contato" label="Salvar como:" />
                    <TextField id="tipo" inputType="text" placeholder="E-mail, Telefone, WhatsApp..." label="Tipo de Contato:" />
                    <TextField id="contato" inputType="text" placeholder="Contato" label="Contato:" />
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
                                    <DropDown label="Contatos" options={selectedFornecedor.contatos} disabled="Selecione um Contato" value={dropdownContatoValue} onChange={handleSelectContato} />
                                </div>
                            </div>
                        )}
                </form>
            )}
        </div>
    );
}

export default CadastroContatos;