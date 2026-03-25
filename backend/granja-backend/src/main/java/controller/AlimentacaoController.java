package com.granja.admin.controller;

import com.granja.admin.model.Alimentacao;
import com.granja.admin.service.AlimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/animais/{idAnimal}/alimentacao")
public class AlimentacaoController {

    @Autowired
    private AlimentacaoService service;

    // GET /api/animais/{id}/alimentacao - Listar alimentações do animal
    @GetMapping
    public ResponseEntity<List<Alimentacao>> listarPorAnimal(@PathVariable Long idAnimal) {
        List<Alimentacao> alimentacoes = service.buscarPorAnimal(idAnimal);
        return ResponseEntity.ok(alimentacoes);
    }

    // POST /api/animais/{id}/alimentacao - Registrar alimentação
    @PostMapping
    public ResponseEntity<Alimentacao> registrar(
            @PathVariable Long idAnimal,
            @RequestBody Alimentacao alimentacao) {
        Alimentacao registrada = service.registrar(alimentacao, idAnimal);
        return ResponseEntity.ok(registrada);
    }

    // DELETE /api/animais/{id}/alimentacao/{idAlimentacao} - Deletar
    @DeleteMapping("/{idAlimentacao}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long idAnimal,
            @PathVariable Long idAlimentacao) {
        service.deletar(idAlimentacao);
        return ResponseEntity.noContent().build();
    }
}