import UserManagement from './pages/configuracoes/UserManagement';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
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

// Componente para rotas protegidas
function PrivateRoute({ children }) {
    const { logado } = useAuth();

    if (!logado) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Conteúdo do sistema (quando logado)
function SistemaContent() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Navigate to="/animais" replace />} />

                {/* Animais */}
                <Route path="/" element={<AnimalList />} />
                <Route path="/animais" element={<AnimalList />} />
                <Route path="/animais/novo" element={<AnimalForm />} />
                <Route path="/animais/:id" element={<AnimalDetails />} />
                <Route path="/animais/:id/editar" element={<AnimalForm />} />

                {/* Financeiro */}
                {/* Configurações */}
                <Route path="/configuracoes" element={<UserManagement />} />
                <Route path="/financeiro" element={<Dashboard />} />
                <Route path="/financeiro/receitas" element={<ReceitaList />} />
                <Route path="/financeiro/receitas/nova" element={<ReceitaForm />} />
                <Route path="/financeiro/receitas/:id" element={<ReceitaForm />} />
                <Route path="/financeiro/receitas/:id/editar" element={<ReceitaForm />} />
                <Route path="/financeiro/despesas" element={<DespesaList />} />
                <Route path="/financeiro/despesas/nova" element={<DespesaForm />} />
                <Route path="/financeiro/despesas/:id" element={<DespesaForm />} />
                <Route path="/financeiro/despesas/:id/editar" element={<DespesaForm />} />

                {/* Rota inválida */}
                <Route path="*" element={<Navigate to="/animais" replace />} />
            </Routes>
        </>
    );
}

// Conteúdo de login (quando não logado)
function LoginContent() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

function AppContent() {
    const { logado } = useAuth();

    return logado ? <SistemaContent /> : <LoginContent />;
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;