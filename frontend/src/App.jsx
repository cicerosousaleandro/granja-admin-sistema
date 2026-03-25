import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import AnimalList from './pages/animais/AnimalList';
import AnimalForm from './pages/animais/AnimalForm';
import AnimalDetails from './pages/animais/AnimalDetails';

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

                    {/* Financeiro - Adicionar depois */}
                    <Route path="/financeiro" element={<div>Em construção</div>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;