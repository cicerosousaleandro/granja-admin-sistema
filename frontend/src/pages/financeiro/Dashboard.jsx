import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Card, CardContent, TextField, Button } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance, Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Dashboard() {
    const [resumo, setResumo] = useState(null);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    useEffect(() => {
        carregarResumo();
    }, []);

    const carregarResumo = async () => {
        try {
            let url = '/financeiro/resumo';
            if (dataInicio && dataFim) {
                url += `?dataInicio=${dataInicio}&dataFim=${dataFim}`;
            }
            const response = await api.get(url);
            setResumo(response.data);
        } catch (error) {
            console.error('Erro ao carregar resumo:', error);
        }
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const handleFiltrar = () => {
        carregarResumo();
    };

    const handleLimpar = () => {
        setDataInicio('');
        setDataFim('');
        setTimeout(carregarResumo, 100);
    };

    if (!resumo) {
        return <Container sx={{ mt: 4 }}><Typography>Carregando...</Typography></Container>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                📈 Dashboard Financeiro
            </Typography>

            {/* Filtro de Período */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    📅 Filtrar por Período
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        type="date"
                        label="Data Início"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />
                    <TextField
                        type="date"
                        label="Data Fim"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />
                    <Button variant="contained" onClick={handleFiltrar}>
                        Filtrar
                    </Button>
                    <Button variant="outlined" onClick={handleLimpar}>
                        Limpar
                    </Button>
                </Box>
            </Paper>

            {/* Cards de Resumo */}
            <Grid container spacing={3} mb={4}>
                {/* Receitas */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: '#e8f5e9' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        📊 Receitas
                                    </Typography>
                                    <Typography variant="h4" color="success.main" fontWeight="bold">
                                        {formatarMoeda(resumo.totalReceitas)}
                                    </Typography>
                                </Box>
                                <TrendingUp fontSize="large" color="success" />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Despesas */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: '#ffebee' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        💸 Despesas
                                    </Typography>
                                    <Typography variant="h4" color="error.main" fontWeight="bold">
                                        {formatarMoeda(resumo.totalDespesas)}
                                    </Typography>
                                </Box>
                                <TrendingDown fontSize="large" color="error" />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Saldo */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: resumo.saldo >= 0 ? '#e3f2fd' : '#ffebee' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        💰 Saldo
                                    </Typography>
                                    <Typography variant="h4"
                                                color={resumo.saldo >= 0 ? 'primary.main' : 'error.main'}
                                                fontWeight="bold">
                                        {formatarMoeda(resumo.saldo)}
                                    </Typography>
                                </Box>
                                <AccountBalance fontSize="large" color={resumo.saldo >= 0 ? 'primary' : 'error'} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Botões de Navegação Rápida */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        color="success"
                        component={Link}
                        to="/financeiro/receitas"
                        sx={{ py: 2, fontSize: '1.1rem' }}
                    >
                        💵 Gerenciar Receitas
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        color="error"
                        component={Link}
                        to="/financeiro/despesas"
                        sx={{ py: 2, fontSize: '1.1rem' }}
                    >
                        💸 Gerenciar Despesas
                    </Button>
                </Grid>
            </Grid>

            {/* Período */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    📅 Período
                </Typography>
                <Typography>
                    De <strong>{resumo.dataInicio}</strong> até <strong>{resumo.dataFim}</strong>
                </Typography>
            </Paper>

            {/* Receitas por Categoria */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    📊 Receitas por Categoria
                </Typography>
                {Object.entries(resumo.receitasPorCategoria || {}).map(([categoria, valor]) => (
                    <Box key={categoria} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography>{categoria}</Typography>
                        <Typography fontWeight="bold" color="success.main">
                            {formatarMoeda(valor)}
                        </Typography>
                    </Box>
                ))}
                {Object.keys(resumo.receitasPorCategoria || {}).length === 0 && (
                    <Typography color="textSecondary">Nenhuma receita no período</Typography>
                )}
            </Paper>

            {/* Despesas por Categoria */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    💸 Despesas por Categoria
                </Typography>
                {Object.entries(resumo.despesasPorCategoria || {}).map(([categoria, valor]) => (
                    <Box key={categoria} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography>{categoria}</Typography>
                        <Typography fontWeight="bold" color="error.main">
                            {formatarMoeda(valor)}
                        </Typography>
                    </Box>
                ))}
                {Object.keys(resumo.despesasPorCategoria || {}).length === 0 && (
                    <Typography color="textSecondary">Nenhuma despesa no período</Typography>
                )}
            </Paper>
        </Container>
    );
}

export default Dashboard;