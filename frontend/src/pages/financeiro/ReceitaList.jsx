import { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function ReceitaList() {
    const [receitas, setReceitas] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        carregarReceitas();
    }, []);

    const carregarReceitas = async () => {
        try {
            const response = await api.get('/receitas');
            setReceitas(response.data);
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
        }
    };

    const deletarReceita = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta receita?')) {
            try {
                await api.delete(`/receitas/${id}`);
                carregarReceitas();
            } catch (error) {
                console.error('Erro ao deletar:', error);
            }
        }
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const receitasFiltradas = receitas.filter(r =>
        r.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
        r.categoria.toLowerCase().includes(filtro.toLowerCase())
    );

    const totalReceitas = receitasFiltradas.reduce((sum, r) => sum + parseFloat(r.valorTotal || 0), 0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    💵 Receitas
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to="/financeiro/receitas/nova"
                    startIcon={<Add />}
                >
                    Nova Receita
                </Button>
            </Box>

            <TextField
                fullWidth
                placeholder="Filtrar por descrição ou categoria..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                sx={{ mb: 3 }}
                size="small"
            />

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                            <TableCell><strong>Data</strong></TableCell>
                            <TableCell><strong>Descrição</strong></TableCell>
                            <TableCell><strong>Categoria</strong></TableCell>
                            <TableCell><strong>Qtd</strong></TableCell>
                            <TableCell><strong>Preço Unit.</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receitasFiltradas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body2" color="textSecondary">
                                        Nenhuma receita cadastrada
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            receitasFiltradas.map((receita) => (
                                <TableRow key={receita.idReceita} hover>
                                    <TableCell>{receita.data}</TableCell>
                                    <TableCell>{receita.descricao}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={receita.categoria}
                                            color={receita.categoria === 'Venda de Ovos' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{receita.quantidade}</TableCell>
                                    <TableCell>{formatarMoeda(receita.precoUnitario)}</TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" color="success.main">
                                            {formatarMoeda(receita.valorTotal)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" component={Link} to={`/financeiro/receitas/${receita.idReceita}`}>
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" component={Link} to={`/financeiro/receitas/${receita.idReceita}/editar`}>
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => deletarReceita(receita.idReceita)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1, textAlign: 'right' }}>
                <Typography variant="h6">
                    Total: <strong>{formatarMoeda(totalReceitas)}</strong>
                </Typography>
            </Box>
        </Container>
    );
}

export default ReceitaList;