import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    🐔 Granja Admin
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/animais">
                        Animais
                    </Button>
                    <Button color="inherit" component={Link} to="/financeiro">
                        Financeiro
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;