import { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Box, MenuItem, Paper } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function AnimalForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        nome: '',
        especie: '',
        raca: '',
        dataNascimento: '',
        pesoAtual: '',
        status: 'Em Crescimento',
        localizacao: ''
    });

    // Tipos de aves para granja de galinhas
    const tiposAves = [
        // Poedeiras (Ovos)
        'Poedeira Branca',
        'Poedeira Vermelha',
        'Poedeira Caipira',

        // Corte (Abate)
        'Frango de Corte',
        'Frango Caipira',

        // Reprodução
        'Galo Reprodutor',
        'Galinha Matriz',
        'Pinto'
    ];

    // Status específicos para granja
    const statusList = [
        'Em Produção',
        'Em Crescimento',
        'Para Abate',
        'Para Reprodução',
        'Para Venda',
        'Doente',
        'Morta'
    ];

    useEffect(() => {
        if (isEdit) {
            carregarAnimal();
        }
    }, [id]);

    const carregarAnimal = async () => {
        try {
            const response = await api.get(`/animais/${id}`);
            const animal = response.data;
            setFormData({
                ...animal,
                dataNascimento: animal.dataNascimento || '',
                pesoAtual: animal.pesoAtual || ''
            });
        } catch (error) {
            console.error('Erro ao carregar animal:', error);
            alert('Erro ao carregar animal');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await api.put(`/animais/${id}`, formData);
                alert('Ave atualizada com sucesso!');
            } else {
                await api.post('/animais', formData);
                alert('Ave cadastrada com sucesso!');
            }
            navigate('/animais');
        } catch (error) {
            console.error('Erro ao salvar animal:', error);
            alert('Erro ao salvar. Verifique os dados.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEdit ? '✏️ Editar Ave' : '➕ Nova Ave'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                        <TextField
                            fullWidth
                            label="Identificação/Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            helperText="Ex: Mimosa 01, Lote A-15"
                        />

                        <TextField
                            fullWidth
                            select
                            label="Tipo da Ave"
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            required
                        >
                            {tiposAves.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Linhagem/Raça"
                            name="raca"
                            value={formData.raca}
                            onChange={handleChange}
                            helperText="Ex: Isa Brown, Cobb 500"
                        />

                        <TextField
                            fullWidth
                            type="date"
                            label="Data de Nascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Peso Atual (kg)"
                            name="pesoAtual"
                            value={formData.pesoAtual}
                            onChange={handleChange}
                            inputProps={{ step: "0.01", min: "0" }}
                            required
                        />

                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusList.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Localização"
                            name="localizacao"
                            value={formData.localizacao}
                            onChange={handleChange}
                            sx={{ gridColumn: 'span 2' }}
                            helperText="Ex: Galpão A, Gaiola 15, Piquete B"
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            startIcon={<Cancel />}
                            onClick={() => navigate('/animais')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                        >
                            {isEdit ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default AnimalForm;