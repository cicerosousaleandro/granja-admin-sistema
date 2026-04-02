import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, IconButton, Alert, CircularProgress } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import api from '../../services/api';

function UserManagement() {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [novoUsuario, setNovoUsuario] = useState({
        username: '',
        password: '',
        nome: '',
        role: 'USER'
    });
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('success');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {

            const response = await api.get('/usuarios');
            setUsuarios(response.data || []);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);

            const usuariosSalvos = localStorage.getItem('usuarios');
            if (usuariosSalvos) {
                setUsuarios(JSON.parse(usuariosSalvos));
            }
        }
    };

    const handleOpenDialog = () => {
        setNovoUsuario({ username: '', password: '', nome: '', role: 'USER' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSalvarUsuario = async () => {
        if (!novoUsuario.username || !novoUsuario.password) {
            setMensagem('Preencha usuário e senha!');
            setTipoMensagem('error');
            return;
        }

        setCarregando(true);

        try {

            await api.post('/usuarios', novoUsuario);

            setMensagem(`Usuário "${novoUsuario.username}" criado com sucesso!`);
            setTipoMensagem('success');
            handleCloseDialog();
            carregarUsuarios();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);

            // Fallback: salva no localStorage se o backend falhar
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

            setMensagem(`Usuário "${novoUsuario.username}" criado (modo local)!`);
            setTipoMensagem('warning');
            handleCloseDialog();
        } finally {
            setCarregando(false);
        }
    };

    const handleDeletarUsuario = async (username) => {
        if (username === 'supervisor') {
            setMensagem('Não é possível deletar o usuário master!');
            setTipoMensagem('error');
            return;
        }

        if (window.confirm(`Deseja realmente deletar o usuário "${username}"?`)) {
            try {
                await api.delete(`/usuarios/${username}`);
                setMensagem(`Usuário "${username}" deletado com sucesso!`);
                setTipoMensagem('success');
                carregarUsuarios();
            } catch (error) {
                // Fallback: deleta do localStorage
                const usuariosAtualizados = usuarios.filter(u => u.username !== username);
                localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
                setUsuarios(usuariosAtualizados);
                setMensagem(`Usuário "${username}" deletado!`);
                setTipoMensagem('success');
            }
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
                <Alert
                    severity={tipoMensagem}
                    sx={{ mb: 3 }}
                    onClose={() => setMensagem('')}
                >
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
                                <TableCell><strong>Nome</strong></TableCell>
                                <TableCell><strong>Perfil</strong></TableCell>
                                <TableCell><strong>Ações</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <strong>supervisor</strong>
                                </TableCell>
                                <TableCell>Administrador Master</TableCell>
                                <TableCell>
                                    <Box component="span" sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontSize: '0.75rem'
                                    }}>
                                        MASTER
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <em style={{ color: 'text.secondary' }}>
                                        Não pode ser deletado
                                    </em>
                                </TableCell>
                            </TableRow>
                            {usuarios.filter(u => u.username !== 'supervisor').map((usuario) => (
                                <TableRow key={usuario.username} hover>
                                    <TableCell>{usuario.username}</TableCell>
                                    <TableCell>{usuario.nome || '-'}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            bgcolor: usuario.role === 'ADMIN' ? 'error.main' : 'success.main',
                                            color: 'white',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '0.75rem'
                                        }}>
                                            {usuario.role || 'USER'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeletarUsuario(usuario.username)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {usuarios.filter(u => u.username !== 'supervisor').length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Nome Completo"
                            name="nome"
                            value={novoUsuario.nome}
                            onChange={handleInputChange}
                            fullWidth
                            placeholder="Ex: João Silva"
                        />

                        <TextField
                            label="Usuário"
                            name="username"
                            value={novoUsuario.username}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            autoFocus
                            placeholder="Ex: joao.silva"
                        />

                        <TextField
                            label="Senha"
                            name="password"
                            type="password"
                            value={novoUsuario.password}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            placeholder="Digite uma senha segura"
                        />

                        <TextField
                            select
                            label="Perfil de Acesso"
                            name="role"
                            value={novoUsuario.role}
                            onChange={handleInputChange}
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="USER">Usuário Comum</option>
                            <option value="ADMIN">Administrador</option>
                        </TextField>

                        <Alert severity="info">
                            O usuário poderá fazer login com essas credenciais.
                        </Alert>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} disabled={carregando}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSalvarUsuario}
                        variant="contained"
                        startIcon={carregando ? <CircularProgress size={20} /> : <Save />}
                        disabled={carregando}
                    >
                        {carregando ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default UserManagement;