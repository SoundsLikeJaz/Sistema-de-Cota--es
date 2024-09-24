export default function Tabela({ cabecalho, gerarDados }) {

    return (
        <div className="listaRequisicoes listaCotacoes">
            {gerarDados().length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {cabecalho.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {gerarDados()}
                    </tbody>
                </table>
            ) : (
                <p>Não há cadastros.</p>
            )}
        </div>
    );
}