package com.granja.admin.service;

import com.granja.admin.model.Alimentacao;
import com.granja.admin.model.Animal;
import com.granja.admin.repository.AlimentacaoRepository;
import com.granja.admin.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlimentacaoService {

    @Autowired
    private AlimentacaoRepository repository;

    @Autowired
    private AnimalRepository animalRepository;

    // Listar todas as alimentações de um animal
    public List<Alimentacao> buscarPorAnimal(Long idAnimal) {
        return repository.findByAnimalIdAnimal(idAnimal);
    }

    // Registrar nova alimentação
    public Alimentacao registrar(Alimentacao alimentacao, Long idAnimal) {
        Animal animal = animalRepository.findById(idAnimal)
                .orElseThrow(() -> new RuntimeException("Animal não encontrado com ID: " + idAnimal));

        alimentacao.setAnimal(animal);
        return repository.save(alimentacao);
    }

    // Deletar registro de alimentação
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}