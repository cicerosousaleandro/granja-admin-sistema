import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const estaLogado = localStorage.getItem('logado') === 'true';
        const usuarioSalvo = localStorage.getItem('usuario');
        setLogado(estaLogado);
        setUsuario(usuarioSalvo);
    }, []);

    const login = (userData) => {
        localStorage.setItem('logado', 'true');
        localStorage.setItem('usuario', userData.usuario);
        localStorage.setItem('token', userData.token);
        setLogado(true);
        setUsuario(userData.usuario);
    };

    const logout = () => {
        localStorage.removeItem('logado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        setLogado(false);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ logado, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}