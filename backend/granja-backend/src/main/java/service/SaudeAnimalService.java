package com.granja.admin.service;

import com.granja.admin.model.Animal;
import com.granja.admin.model.SaudeAnimal;
import com.granja.admin.repository.AnimalRepository;
import com.granja.admin.repository.SaudeAnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SaudeAnimalService {

    @Autowired
    private SaudeAnimalRepository repository;

    @Autowired
    private AnimalRepository animalRepository;

    // Listar todos os registros de saúde de um animal
    public List<SaudeAnimal> buscarPorAnimal(Long idAnimal) {
        return repository.findByAnimalIdAnimal(idAnimal);
    }

    // Registrar novo evento de saúde
    public SaudeAnimal registrar(SaudeAnimal saude, Long idAnimal) {
        Animal animal = animalRepository.findById(idAnimal)
                .orElseThrow(() -> new RuntimeException("Animal não encontrado com ID: " + idAnimal));

        saude.setAnimal(animal);
        return repository.save(saude);
    }

    // Deletar registro de saúde
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}