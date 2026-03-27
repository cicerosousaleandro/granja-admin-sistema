import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, IconButton, Alert } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import api from '../../services/api';

function UserManagement() {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [novoUsuario, setNovoUsuario] = useState({ username: '', password: '' });
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('success');

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = () => {
        // Usuários armazenados no localStorage
        const usuariosSalvos = localStorage.getItem('usuarios');
        if (usuariosSalvos) {
            setUsuarios(JSON.parse(usuariosSalvos));
        }
    };

    const handleOpenDialog = () => {
        setNovoUsuario({ username: '', password: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSalvarUsuario = async () => {
        if (!novoUsuario.username || !novoUsuario.password) {
            setMensagem('Preencha todos os campos!');
            setTipoMensagem('error');
            return;
        }

        try {

            await api.post('/usuarios', novoUsuario);


            const usuariosAtuais = JSON.parse(localStorage.getItem('usuarios') || '[]');
            const usuarioExiste = usuariosAtuais.find(u => u.username === novoUsuario.username);

            if (usuarioExiste) {
                setMensagem('Usuário já existe!');
                setTipoMensagem('error');
                return;
            }

            usuariosAtuais.push({
                ...novoUsuario,
                createdAt: new Date().toISOString()
            });

            localStorage.setItem('usuarios', JSON.stringify(usuariosAtuais));
            setUsuarios(usuariosAtuais);

            setMensagem(`Usuário "${novoUsuario.username}" criado com sucesso!`);
            setTipoMensagem('success');
            handleCloseDialog();
        } catch (error) {
            setMensagem('Erro ao criar usuário');
            setTipoMensagem('error');
        }
    };

    const handleDeletarUsuario = (username) => {
        if (username === 'supervisor') {
            setMensagem('Não é possível deletar o usuário master!');
            setTipoMensagem('error');
            return;
        }

        if (window.confirm(`Deseja realmente deletar o usuário "${username}"?`)) {
            const usuariosAtualizados = usuarios.filter(u => u.username !== username);
            localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
            setUsuarios(usuariosAtualizados);
            setMensagem(`Usuário "${username}" deletado com sucesso!`);
            setTipoMensagem('success');
        }
    };

    const handleInputChange = (e) => {
        setNovoUsuario({
            ...novoUsuario,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                ⚙️ Configurações - Gestão de Usuários
            </Typography>

            {mensagem && (
                <Alert severity={tipoMensagem} sx={{ mb: 3 }} onClose={() => setMensagem('')}>
                    {mensagem}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6">
                        Usuários Cadastrados
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenDialog}
                    >
                        Novo Usuário
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Usuário</strong></TableCell>
                                <TableCell><strong>Data de Criação</strong></TableCell>
                                <TableCell><strong>Ações</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <strong>supervisor</strong> (Master)
                                </TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>
                                    <em>Não pode ser deletado</em>
                                </TableCell>
                            </TableRow>
                            {usuarios.map((usuario) => (
                                <TableRow key={usuario.username} hover>
                                    <TableCell>{usuario.username}</TableCell>
                                    <TableCell>
                                        {usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString('pt-BR') : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeletarUsuario(usuario.username)}
                                            disabled={usuario.username === 'supervisor'}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {usuarios.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography color="textSecondary">
                                            Nenhum usuário cadastrado. Clique em "Novo Usuário" para criar.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Dialog para Criar Usuário */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Usuário"
                            name="username"
                            value={novoUsuario.username}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            autoFocus
                            placeholder="Digite o nome de usuário"
                        />

                        <TextField
                            label="Senha"
                            name="password"
                            type="password"
                            value={novoUsuario.password}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            placeholder="Digite a senha"
                        />

                        <Alert severity="info">
                            O usuário poderá fazer login com essas credenciais.
                        </Alert>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button
                        onClick={handleSalvarUsuario}
                        variant="contained"
                        startIcon={<Save />}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default UserManagement;