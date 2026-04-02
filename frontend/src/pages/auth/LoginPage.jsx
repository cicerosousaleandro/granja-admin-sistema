import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
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
            // ✅ CHAMA A API REAL DO BACKEND
            const response = await api.post('/login', {
                username: usuario,
                password: senha
            });

            const data = response.data;

            if (data.token) {
                // ✅ Salva dados do usuário no contexto E no localStorage
                login({
                    usuario: data.username,
                    token: data.token,
                    role: data.role,
                    nome: data.nome
                });

                // ✅ Redireciona para dashboard
                navigate('/animais');
            } else {
                setErro(data.mensagem || 'Usuário ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro no login:', error);

            if (error.response?.status === 401) {
                setErro('Usuário ou senha inválidos');
            } else if (error.code === 'ERR_NETWORK') {
                setErro('Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:8081');
            } else {
                setErro('Erro ao conectar com o servidor');
            }
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
                        🐔 Granja Admin
                    </Typography>
                    <Typography variant="body1" color="textSecondary" mt={1}>
                        Faça login para continuar
                    </Typography>
                </Box>

                {erro && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErro('')}>
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
                        disabled={carregando}
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
                        disabled={carregando}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={carregando}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {carregando ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Entrando...
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;