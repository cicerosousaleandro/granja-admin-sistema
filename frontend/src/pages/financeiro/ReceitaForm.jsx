import { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Box, MenuItem, Paper } from '@mui/material';
import { Save, Cancel, Calculate } from '@mui/icons-material';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ReceitaForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        data: '',  // ← CORRIGIDO: Adicionado "data:"
        descricao: '',
        quantidade: '',
        precoUnitario: '',
        valorTotal: '',
        categoria: '',
        observacoes: ''
    });

    const categorias = [
        'Venda de Ovos',
        'Venda de Aves',
        'Subsídio',
        'Serviços',
        'Outros'
    ];

    useEffect(() => {
        if (isEdit) {
            carregarReceita();
        }
    }, [id]);

    const carregarReceita = async () => {
        try {
            const response = await api.get(`/receitas/${id}`);
            const receita = response.data;
            setFormData({
                ...receita,
                quantidade: receita.quantidade || '',
                precoUnitario: receita.precoUnitario || '',
                valorTotal: receita.valorTotal || ''
            });
        } catch (error) {
            console.error('Erro ao carregar receita:', error);
            alert('Erro ao carregar receita');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            if (name === 'quantidade' || name === 'precoUnitario') {
                const qtd = name === 'quantidade' ? value : prev.quantidade;
                const preco = name === 'precoUnitario' ? value : prev.precoUnitario;

                if (qtd && preco) {
                    newData.valorTotal = (parseFloat(qtd) * parseFloat(preco)).toFixed(2);
                }
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dadosParaEnviar = {
                ...formData,
                quantidade: parseFloat(formData.quantidade),
                precoUnitario: parseFloat(formData.precoUnitario),
                valorTotal: parseFloat(formData.valorTotal)
            };

            if (isEdit) {
                await api.put(`/receitas/${id}`, dadosParaEnviar);
                alert('Receita atualizada com sucesso!');
            } else {
                await api.post('/receitas', dadosParaEnviar);
                alert('Receita cadastrada com sucesso!');
            }
            navigate('/financeiro/receitas');
        } catch (error) {
            console.error('Erro ao salvar receita:', error);
            alert('Erro ao salvar receita. Verifique os dados.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEdit ? '✏️ Editar Receita' : '➕ Nova Receita'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Data"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />

                        <TextField
                            fullWidth
                            select
                            label="Categoria"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                        >
                            {categorias.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Descrição"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            sx={{ gridColumn: 'span 2' }}
                            helperText="Ex: Venda de 50 dúzias de ovos"
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Quantidade"
                            name="quantidade"
                            value={formData.quantidade}
                            onChange={handleChange}
                            inputProps={{ step: "0.01", min: "0" }}
                            required
                            helperText="Ex: 50 (dúzias)"
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Preço Unitário (R$)"
                            name="precoUnitario"
                            value={formData.precoUnitario}
                            onChange={handleChange}
                            inputProps={{ step: "0.01", min: "0" }}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Valor Total (R$)"
                            name="valorTotal"
                            value={formData.valorTotal}
                            InputProps={{
                                readOnly: true,
                                endAdornment: <Calculate color="success" />
                            }}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontWeight: 'bold',
                                    color: 'success.main'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Observações"
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            sx={{ gridColumn: 'span 2' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            startIcon={<Cancel />}
                            onClick={() => navigate('/financeiro/receitas')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
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

export default ReceitaForm;