package com.granja.admin.service;

import com.granja.admin.model.Receita;
import com.granja.admin.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository repository;

    // Listar todas as receitas
    public List<Receita> buscarTodas() {
        return repository.findAll();
    }

    // Buscar receita por ID
    public Receita buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada com ID: " + id));
    }

    // Salvar nova receita
    public Receita salvar(Receita receita) {
        return repository.save(receita);
    }

    // Deletar receita
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}