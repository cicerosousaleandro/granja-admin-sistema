import { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, TextField } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function AnimalList() {
    const [animais, setAnimais] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        carregarAnimais();
    }, []);

    const carregarAnimais = async () => {
        try {
            const response = await api.get('/animais');
            setAnimais(response.data);
        } catch (error) {
            console.error('Erro ao carregar animais:', error);
            alert('Erro ao carregar animais. Verifique se o backend está rodando!');
        }
    };

    const deletarAnimal = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este animal?')) {
            try {
                await api.delete(`/animais/${id}`);
                carregarAnimais();
                alert('Animal deletado com sucesso!');
            } catch (error) {
                console.error('Erro ao deletar:', error);
                alert('Erro ao deletar animal');
            }
        }
    };

    const animaisFiltrados = animais.filter(animal =>
        animal.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        animal.especie.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    🐔 Animais
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/animais/novo"
                    startIcon={<Add />}
                >
                    Novo Animal
                </Button>
            </Box>

            <TextField
                fullWidth
                placeholder="Filtrar por identificação, tipo ou linhagem..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                sx={{ mb: 3 }}
                size="small"
            />

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Identificação</strong></TableCell>
                            <TableCell><strong>Tipo</strong></TableCell>
                            <TableCell><strong>Linhagem</strong></TableCell>
                            <TableCell><strong>Peso (kg)</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animaisFiltrados.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body2" color="textSecondary">
                                        Nenhum animal cadastrado
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            animaisFiltrados.map((animal) => (
                                <TableRow key={animal.idAnimal} hover>
                                    <TableCell>{animal.idAnimal}</TableCell>
                                    <TableCell>{animal.nome}</TableCell>
                                    <TableCell>{animal.especie}</TableCell>
                                    <TableCell>{animal.raca || '-'}</TableCell>
                                    <TableCell>{animal.pesoAtual}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={animal.status}
                                            color={animal.status === 'Ativo' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" component={Link} to={`/animais/${animal.idAnimal}`}>
                                            <Visibility fontSize="small" />
                                        </Button>
                                        <Button size="small" component={Link} to={`/animais/${animal.idAnimal}/editar`}>
                                            <Edit fontSize="small" />
                                        </Button>
                                        <Button size="small" color="error" onClick={() => deletarAnimal(animal.idAnimal)}>
                                            <Delete fontSize="small" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AnimalList;