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

    // GET /api/animais - Listar todos
    @GetMapping
    public ResponseEntity<List<Animal>> listarTodos() {
        List<Animal> animais = service.buscarTodos();
        return ResponseEntity.ok(animais);
    }

    // GET /api/animais/{id} - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {
        Animal animal = service.buscarPorId(id);
        return ResponseEntity.ok(animal);
    }

    // POST /api/animais - Criar novo
    @PostMapping
    public ResponseEntity<Animal> criar(@RequestBody Animal animal) {
        Animal salvo = service.salvar(animal);
        return ResponseEntity.ok(salvo);
    }

    // PUT /api/animais/{id} - Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id, @RequestBody Animal animal) {
        animal.setIdAnimal(id);
        Animal atualizado = service.salvar(animal);
        return ResponseEntity.ok(atualizado);
    }

    // DELETE /api/animais/{id} - Deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}