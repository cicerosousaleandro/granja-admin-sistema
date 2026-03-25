import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Chip, Button, Tabs, Tab } from '@mui/material';
import { ArrowBack, Add } from '@mui/icons-material';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function AnimalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [tab, setTab] = useState(0);
    const [alimentacoes, setAlimentacoes] = useState([]);
    const [saude, setSaude] = useState([]);

    useEffect(() => {
        carregarAnimal();
        carregarAlimentacoes();
        carregarSaude();
    }, [id]);

    const carregarAnimal = async () => {
        try {
            const response = await api.get(`/animais/${id}`);
            setAnimal(response.data);
        } catch (error) {
            console.error('Erro ao carregar animal:', error);
            alert('Erro ao carregar animal');
        }
    };

    const carregarAlimentacoes = async () => {
        try {
            const response = await api.get(`/animais/${id}/alimentacao`);
            setAlimentacoes(response.data);
        } catch (error) {
            console.error('Erro ao carregar alimentações:', error);
        }
    };

    const carregarSaude = async () => {
        try {
            const response = await api.get(`/animais/${id}/saude`);
            setSaude(response.data);
        } catch (error) {
            console.error('Erro ao carregar registros de saúde:', error);
        }
    };

    if (!animal) return <div>Carregando...</div>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/animais')} sx={{ mb: 2 }}>
                Voltar
            </Button>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    🐄 {animal.nome}
                </Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                    <div><strong>Espécie:</strong> {animal.especie}</div>
                    <div><strong>Raça:</strong> {animal.raca || '-'}</div>
                    <div><strong>Data Nascimento:</strong> {animal.dataNascimento || '-'}</div>
                    <div><strong>Peso:</strong> {animal.pesoAtual} kg</div>
                    <div><strong>Localização:</strong> {animal.localizacao || '-'}</div>
                    <div>
                        <strong>Status:</strong>
                        <Chip
                            label={animal.status}
                            color={animal.status === 'Ativo' ? 'success' : 'default'}
                            sx={{ ml: 1 }}
                        />
                    </div>
                </Box>
            </Paper>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="📋 Informações" />
                    <Tab label={`🌾 Alimentação (${alimentacoes.length})`} />
                    <Tab label={`💉 Saúde (${saude.length})`} />
                </Tabs>
            </Box>

            {tab === 0 && (
                <Paper sx={{ p: 3 }}>
                    <Typography>Dados completos do animal</Typography>
                </Paper>
            )}

            {tab === 1 && (
                <Paper sx={{ p: 3 }}>
                    <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }}>
                        Registrar Alimentação
                    </Button>
                    {alimentacoes.length === 0 ? (
                        <Typography>Nenhuma alimentação registrada</Typography>
                    ) : (
                        alimentacoes.map((a) => (
                            <Box key={a.idAlimentacao} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography><strong>Data:</strong> {a.data}</Typography>
                                <Typography><strong>Quantidade:</strong> {a.quantidadeKg} kg</Typography>
                                <Typography><strong>Tipo:</strong> {a.tipoRacao}</Typography>
                            </Box>
                        ))
                    )}
                </Paper>
            )}

            {tab === 2 && (
                <Paper sx={{ p: 3 }}>
                    <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }}>
                        Registrar Evento
                    </Button>
                    {saude.length === 0 ? (
                        <Typography>Nenhum registro de saúde</Typography>
                    ) : (
                        saude.map((s) => (
                            <Box key={s.idSaude} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography><strong>Data:</strong> {s.data}</Typography>
                                <Typography><strong>Tipo:</strong> {s.tipoEvento}</Typography>
                                <Typography><strong>Descrição:</strong> {s.descricao}</Typography>
                            </Box>
                        ))
                    )}
                </Paper>
            )}
        </Container>
    );
}

export default AnimalDetails;