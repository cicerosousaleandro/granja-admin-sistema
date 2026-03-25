package com.granja.admin.controller;

import com.granja.admin.model.SaudeAnimal;
import com.granja.admin.service.SaudeAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/animais/{idAnimal}/saude")
public class SaudeAnimalController {

    @Autowired
    private SaudeAnimalService service;

    // GET /api/animais/{id}/saude - Listar registros de saúde do animal
    @GetMapping
    public ResponseEntity<List<SaudeAnimal>> listarPorAnimal(@PathVariable Long idAnimal) {
        List<SaudeAnimal> saudes = service.buscarPorAnimal(idAnimal);
        return ResponseEntity.ok(saudes);
    }

    // POST /api/animais/{id}/saude - Registrar evento de saúde
    @PostMapping
    public ResponseEntity<SaudeAnimal> registrar(
            @PathVariable Long idAnimal,
            @RequestBody SaudeAnimal saude) {
        SaudeAnimal registrado = service.registrar(saude, idAnimal);
        return ResponseEntity.ok(registrado);
    }

    // DELETE /api/animais/{id}/saude/{idSaude} - Deletar
    @DeleteMapping("/{idSaude}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long idAnimal,
            @PathVariable Long idSaude) {
        service.deletar(idSaude);
        return ResponseEntity.noContent().build();
    }
}