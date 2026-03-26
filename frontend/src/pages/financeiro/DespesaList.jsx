import { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function DespesaList() {
    const [despesas, setDespesas] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        carregarDespesas();
    }, []);

    const carregarDespesas = async () => {
        try {
            const response = await api.get('/despesas');
            setDespesas(response.data);
        } catch (error) {
            console.error('Erro ao carregar despesas:', error);
        }
    };

    const deletarDespesa = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta despesa?')) {
            try {
                await api.delete(`/despesas/${id}`);
                carregarDespesas();
            } catch (error) {
                console.error('Erro ao deletar:', error);
            }
        }
    };

    // Formatar moeda brasileira
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const despesasFiltradas = despesas.filter(d =>
        d.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
        d.categoria.toLowerCase().includes(filtro.toLowerCase())
    );

    // Calcular total
    const totalDespesas = despesasFiltradas.reduce((sum, d) => sum + parseFloat(d.valorTotal || 0), 0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    💸 Despesas
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    component={Link}
                    to="/financeiro/despesas/nova"
                    startIcon={<Add />}
                >
                    Nova Despesa
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
                        <TableRow sx={{ backgroundColor: '#ffebee' }}>
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
                        {despesasFiltradas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body2" color="textSecondary">
                                        Nenhuma despesa cadastrada
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            despesasFiltradas.map((despesa) => (
                                <TableRow key={despesa.idDespesa} hover>
                                    <TableCell>{despesa.data}</TableCell>
                                    <TableCell>{despesa.descricao}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={despesa.categoria}
                                            color={despesa.categoria === 'Ração' ? 'error' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{despesa.quantidade}</TableCell>
                                    <TableCell>{formatarMoeda(despesa.precoUnitario)}</TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" color="error.main">
                                            {formatarMoeda(despesa.valorTotal)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" component={Link} to={`/financeiro/despesas/${despesa.idDespesa}`}>
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" component={Link} to={`/financeiro/despesas/${despesa.idDespesa}/editar`}>
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => deletarDespesa(despesa.idDespesa)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Totalizador */}
            <Box sx={{ mt: 2, p: 2, bgcolor: '#ffebee', borderRadius: 1, textAlign: 'right' }}>
                <Typography variant="h6">
                    Total: <strong>{formatarMoeda(totalDespesas)}</strong>
                </Typography>
            </Box>
        </Container>
    );
}

export default DespesaList;