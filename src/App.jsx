import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { CadastroContatos, CadastroCotacoes, CadastroFornecedores, CadastroProdutos, Consulta, Home, Layout } from './pages';
import { AppProviders } from './context';

function App() {

  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/cadastro-fornecedores" element={<CadastroFornecedores />} />
            <Route path="/cadastro-contatos" element={<CadastroContatos />} />
            <Route path="/cadastro-produtos" element={<CadastroProdutos />} />
            <Route path="/cadastro-cotacoes" element={<CadastroCotacoes />} />
            <Route path="/consulta" element={<Consulta />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  )
}

export default App;
