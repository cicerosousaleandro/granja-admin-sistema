package com.granja.admin.service;

import com.granja.admin.model.Animal;
import com.granja.admin.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    // Listar todos os animais
    public List<Animal> buscarTodos() {
        return repository.findAll();
    }

    // Buscar animal por ID
    public Animal buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal não encontrado com ID: " + id));
    }

    // Salvar novo animal ou atualizar existente
    public Animal salvar(Animal animal) {
        return repository.save(animal);
    }

    // Deletar animal
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}