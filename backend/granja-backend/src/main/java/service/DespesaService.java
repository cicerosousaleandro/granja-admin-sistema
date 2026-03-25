package com.granja.admin.service;

import com.granja.admin.model.Despesa;
import com.granja.admin.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository repository;

    // Listar todas as despesas
    public List<Despesa> buscarTodas() {
        return repository.findAll();
    }

    // Buscar despesa por ID
    public Despesa buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada com ID: " + id));
    }

    // Salvar nova despesa
    public Despesa salvar(Despesa despesa) {
        return repository.save(despesa);
    }

    // Deletar despesa
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}