import './App.css'
import { Dashboard } from './pages';
import { AppProviders } from './context';

function App() {

  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  )
}

export default App;
