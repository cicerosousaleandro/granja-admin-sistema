import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    🐔 Administração de Granja
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/animais">
                        Animais
                    </Button>
                    <Button color="inherit" component={Link} to="/financeiro">
                        Financeiro
                    </Button>
                    <Button color="inherit" component={Link} to="/configuracoes">
                        Configurações
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;