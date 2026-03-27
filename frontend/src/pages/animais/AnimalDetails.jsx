import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Chip, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { ArrowBack, Add, Save } from '@mui/icons-material';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function AnimalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [tab, setTab] = useState(0);
    const [alimentacoes, setAlimentacoes] = useState([]);
    const [saude, setSaude] = useState([]);

    // Estados para alimentação
    const [openAlimentacao, setOpenAlimentacao] = useState(false);
    const [formAlimentacao, setFormAlimentacao] = useState({
        data: new Date().toISOString().split('T')[0],
        quantidadeKg: '',
        tipoRacao: '',
        observacoes: ''
    });

    // Estados para saúde
    const [openSaude, setOpenSaude] = useState(false);
    const [formSaude, setFormSaude] = useState({
        data: new Date().toISOString().split('T')[0],
        tipoEvento: '',
        descricao: '',
        medicamento: '',
        veterinario: ''
    });

    const tiposEvento = ['Vacinação', 'Tratamento', 'Consulta'];

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

    // Funções de Alimentação
    const handleOpenAlimentacao = () => {
        setOpenAlimentacao(true);
    };

    const handleCloseAlimentacao = () => {
        setOpenAlimentacao(false);
        setFormAlimentacao({
            data: new Date().toISOString().split('T')[0],
            quantidadeKg: '',
            tipoRacao: '',
            observacoes: ''
        });
    };

    const handleSaveAlimentacao = async () => {
        try {
            await api.post(`/animais/${id}/alimentacao`, formAlimentacao);
            alert('Alimentação registrada com sucesso!');
            handleCloseAlimentacao();
            carregarAlimentacoes();
        } catch (error) {
            console.error('Erro ao registrar alimentação:', error);
            alert('Erro ao registrar alimentação');
        }
    };

    const handleAlimentacaoChange = (e) => {
        setFormAlimentacao({
            ...formAlimentacao,
            [e.target.name]: e.target.value
        });
    };

    // Funções de Saúde
    const handleOpenSaude = () => {
        setOpenSaude(true);
    };

    const handleCloseSaude = () => {
        setOpenSaude(false);
        setFormSaude({
            data: new Date().toISOString().split('T')[0],
            tipoEvento: '',
            descricao: '',
            medicamento: '',
            veterinario: ''
        });
    };

    const handleSaveSaude = async () => {
        try {
            await api.post(`/animais/${id}/saude`, formSaude);
            alert('Evento de saúde registrado com sucesso!');
            handleCloseSaude();
            carregarSaude();
        } catch (error) {
            console.error('Erro ao registrar evento de saúde:', error);
            alert('Erro ao registrar evento de saúde');
        }
    };

    const handleSaudeChange = (e) => {
        setFormSaude({
            ...formSaude,
            [e.target.name]: e.target.value
        });
    };

    if (!animal) return <div>Carregando...</div>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/animais')} sx={{ mb: 2 }}>
                Voltar
            </Button>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Typography variant="h3">🐔 {animal.nome}</Typography>
                </Box>

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
                            color={animal.status === 'Em Produção' ? 'success' : 'default'}
                            sx={{ ml: 1 }}
                            size="small"
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
                    <Typography variant="h6" gutterBottom>
                        Informações Gerais
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Dados completos do animal
                    </Typography>
                </Paper>
            )}

            {tab === 1 && (
                <Paper sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6">
                            Histórico de Alimentação
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleOpenAlimentacao}
                        >
                            Registrar Alimentação
                        </Button>
                    </Box>

                    {alimentacoes.length === 0 ? (
                        <Box textAlign="center" py={4}>
                            <Typography color="textSecondary">
                                Nenhuma alimentação registrada
                            </Typography>
                        </Box>
                    ) : (
                        alimentacoes.map((a) => (
                            <Box key={a.idAlimentacao} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                <Typography><strong>Data:</strong> {a.data}</Typography>
                                <Typography><strong>Quantidade:</strong> {a.quantidadeKg} kg</Typography>
                                <Typography><strong>Tipo:</strong> {a.tipoRacao || '-'}</Typography>
                                {a.observacoes && (
                                    <Typography><strong>Obs:</strong> {a.observacoes}</Typography>
                                )}
                            </Box>
                        ))
                    )}
                </Paper>
            )}

            {tab === 2 && (
                <Paper sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6">
                            Histórico de Saúde
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleOpenSaude}
                        >
                            Registrar Evento
                        </Button>
                    </Box>

                    {saude.length === 0 ? (
                        <Box textAlign="center" py={4}>
                            <Typography color="textSecondary">
                                Nenhum registro de saúde
                            </Typography>
                        </Box>
                    ) : (
                        saude.map((s) => (
                            <Box key={s.idSaude} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                <Typography><strong>Data:</strong> {s.data}</Typography>
                                <Typography><strong>Tipo:</strong> {s.tipoEvento}</Typography>
                                <Typography><strong>Descrição:</strong> {s.descricao}</Typography>
                                {s.medicamento && (
                                    <Typography><strong>Medicamento:</strong> {s.medicamento}</Typography>
                                )}
                                {s.veterinario && (
                                    <Typography><strong>Veterinário:</strong> {s.veterinario}</Typography>
                                )}
                            </Box>
                        ))
                    )}
                </Paper>
            )}

            {/* Dialog para Registrar Alimentação */}
            <Dialog open={openAlimentacao} onClose={handleCloseAlimentacao} maxWidth="sm" fullWidth>
                <DialogTitle>Registrar Alimentação</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Data"
                            name="data"
                            type="date"
                            value={formAlimentacao.data}
                            onChange={handleAlimentacaoChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Quantidade (kg)"
                            name="quantidadeKg"
                            type="number"
                            value={formAlimentacao.quantidadeKg}
                            onChange={handleAlimentacaoChange}
                            inputProps={{ step: "0.01", min: "0" }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Tipo de Ração"
                            name="tipoRacao"
                            value={formAlimentacao.tipoRacao}
                            onChange={handleAlimentacaoChange}
                            fullWidth
                            placeholder="Ex: Ração para poedeiras"
                        />

                        <TextField
                            label="Observações"
                            name="observacoes"
                            value={formAlimentacao.observacoes}
                            onChange={handleAlimentacaoChange}
                            fullWidth
                            multiline
                            rows={2}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlimentacao}>Cancelar</Button>
                    <Button onClick={handleSaveAlimentacao} variant="contained" startIcon={<Save />}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para Registrar Evento de Saúde */}
            <Dialog open={openSaude} onClose={handleCloseSaude} maxWidth="sm" fullWidth>
                <DialogTitle>Registrar Evento de Saúde</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Data"
                            name="data"
                            type="date"
                            value={formSaude.data}
                            onChange={handleSaudeChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="Tipo de Evento"
                            name="tipoEvento"
                            value={formSaude.tipoEvento}
                            onChange={handleSaudeChange}
                            fullWidth
                            required
                        >
                            {tiposEvento.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Descrição"
                            name="descricao"
                            value={formSaude.descricao}
                            onChange={handleSaudeChange}
                            fullWidth
                            multiline
                            rows={3}
                            required
                            placeholder="Descreva o evento (sintomas, procedimento, etc.)"
                        />

                        <TextField
                            label="Medicamento"
                            name="medicamento"
                            value={formSaude.medicamento}
                            onChange={handleSaudeChange}
                            fullWidth
                            placeholder="Ex: Antibiótico X, Vacina Y"
                        />

                        <TextField
                            label="Veterinário"
                            name="veterinario"
                            value={formSaude.veterinario}
                            onChange={handleSaudeChange}
                            fullWidth
                            placeholder="Nome do veterinário responsável"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSaude}>Cancelar</Button>
                    <Button onClick={handleSaveSaude} variant="contained" startIcon={<Save />}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AnimalDetails;