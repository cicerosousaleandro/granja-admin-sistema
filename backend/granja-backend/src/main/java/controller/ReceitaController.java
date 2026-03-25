package com.granja.admin.controller;

import com.granja.admin.model.Receita;
import com.granja.admin.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    // GET /api/receitas - Listar todas
    @GetMapping
    public ResponseEntity<List<Receita>> listarTodas() {
        return ResponseEntity.ok(service.buscarTodas());
    }

    // GET /api/receitas/{id} - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // POST /api/receitas - Criar nova
    @PostMapping
    public ResponseEntity<Receita> criar(@RequestBody Receita receita) {
        return ResponseEntity.ok(service.salvar(receita));
    }

    // PUT /api/receitas/{id} - Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        receita.setIdReceita(id);
        return ResponseEntity.ok(service.salvar(receita));
    }

    // DELETE /api/receitas/{id} - Deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}