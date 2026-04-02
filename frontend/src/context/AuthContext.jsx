import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    // ✅ Carrega estado ao iniciar
    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');
        const role = localStorage.getItem('role');
        const nome = localStorage.getItem('nome');

        if (token && usuarioSalvo) {
            setLogado(true);
            setUsuario({
                username: usuarioSalvo,
                role,
                nome
            });
        }
    }, []);

    // ✅ Login: salva TUDO no localStorage
    const login = (userData) => {
        localStorage.setItem('logado', 'true');
        localStorage.setItem('usuario', userData.usuario);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role || '');
        localStorage.setItem('nome', userData.nome || '');

        setLogado(true);
        setUsuario({
            username: userData.usuario,
            role: userData.role,
            nome: userData.nome
        });
    };

    // ✅ Logout: limpa TUDO
    const logout = () => {
        localStorage.removeItem('logado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('nome');
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