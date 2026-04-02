package com.granja.admin.service;

import com.granja.admin.model.Usuario;
import com.granja.admin.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario buscarPorUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + username));
    }

    public Usuario criarUsuario(Usuario novoUsuario) {
        novoUsuario.setPassword(passwordEncoder.encode(novoUsuario.getPassword()));
        return repository.save(novoUsuario);
    }
}