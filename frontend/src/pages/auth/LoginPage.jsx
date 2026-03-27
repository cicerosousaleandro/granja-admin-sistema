import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro('');

        try {

            if (usuario === 'supervisor' && senha === 'login@321564') {
                login({
                    usuario: 'supervisor',
                    token: 'token-master-' + Date.now()
                });
                navigate('/animais');
                return;
            }


            const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
            const usuarioEncontrado = usuariosCadastrados.find(
                u => u.username === usuario && u.password === senha
            );

            if (usuarioEncontrado) {
                login({
                    usuario: usuarioEncontrado.username,
                    token: 'token-user-' + Date.now()
                });
                navigate('/animais');
            } else {
                setErro('Usuário ou senha inválidos');
            }
        } catch (error) {
            setErro('Erro ao conectar com o servidor');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" component="h1">

                    </Typography>
                    <Typography variant="body1" color="textSecondary" mt={1}>
                        Faça login para continuar
                    </Typography>
                </Box>

                {erro && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {erro}
                    </Alert>
                )}

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        margin="normal"
                        required
                        autoFocus
                        placeholder="Digite seu usuário"
                    />

                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        margin="normal"
                        required
                        placeholder="Digite sua senha"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={carregando}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </Button>

                    
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;