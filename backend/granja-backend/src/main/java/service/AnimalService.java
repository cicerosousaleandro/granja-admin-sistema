package com.granja.admin.service;

import com.granja.admin.model.Animal;
import com.granja.admin.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public List<Animal> buscarTodos() {
        List<Animal> listaDeAnimais = repository.findAll();
        return listaDeAnimais;
    }

    public Animal buscarPorId(Long id) {
        Optional<Animal> animalOptional = repository.findById(id);

        if (animalOptional.isPresent()) {
            Animal animal = animalOptional.get();
            return animal;
        } else {
            String mensagem = "Animal não encontrado com ID: " + id;
            throw new RuntimeException(mensagem);
        }
    }

    public Animal salvar(Animal animal) {
        Animal animalSalvo = repository.save(animal);
        return animalSalvo;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}