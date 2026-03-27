package com.granja.admin.controller;

import com.granja.admin.model.Animal;
import com.granja.admin.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    @Autowired
    private AnimalService service;

    @GetMapping
    public ResponseEntity<List<Animal>> listarTodos() {
        List<Animal> lista = service.buscarTodos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {
        Animal animalEncontrado = service.buscarPorId(id);
        return ResponseEntity.ok(animalEncontrado);
    }

    @PostMapping
    public ResponseEntity<Animal> criar(@RequestBody Animal animal) {
        Animal novoAnimal = service.salvar(animal);
        return ResponseEntity.ok(novoAnimal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id, @RequestBody Animal animal) {
        animal.setIdAnimal(id);
        Animal animalAtualizado = service.salvar(animal);
        return ResponseEntity.ok(animalAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}