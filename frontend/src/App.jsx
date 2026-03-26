import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import AnimalList from './pages/animais/AnimalList';
import AnimalForm from './pages/animais/AnimalForm';
import AnimalDetails from './pages/animais/AnimalDetails';
import ReceitaList from './pages/financeiro/ReceitaList';
import ReceitaForm from './pages/financeiro/ReceitaForm';
import DespesaList from './pages/financeiro/DespesaList';
import DespesaForm from './pages/financeiro/DespesaForm';
import Dashboard from './pages/financeiro/Dashboard';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {/* Animais */}
                    <Route path="/" element={<AnimalList />} />
                    <Route path="/animais" element={<AnimalList />} />
                    <Route path="/animais/novo" element={<AnimalForm />} />
                    <Route path="/animais/:id" element={<AnimalDetails />} />
                    <Route path="/animais/:id/editar" element={<AnimalForm />} />

                    {/* Financeiro */}
                    <Route path="/financeiro" element={<Dashboard />} />
                    <Route path="/financeiro/receitas" element={<ReceitaList />} />
                    <Route path="/financeiro/receitas/nova" element={<ReceitaForm />} />
                    <Route path="/financeiro/receitas/:id" element={<ReceitaForm />} />
                    <Route path="/financeiro/receitas/:id/editar" element={<ReceitaForm />} />
                    <Route path="/financeiro/despesas" element={<DespesaList />} />
                    <Route path="/financeiro/despesas/nova" element={<DespesaForm />} />
                    <Route path="/financeiro/despesas/:id" element={<DespesaForm />} />
                    <Route path="/financeiro/despesas/:id/editar" element={<DespesaForm />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;