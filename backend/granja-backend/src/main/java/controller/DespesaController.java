package com.granja.admin.controller;

import com.granja.admin.model.Despesa;
import com.granja.admin.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService service;

    // GET /api/despesas - Listar todas
    @GetMapping
    public ResponseEntity<List<Despesa>> listarTodas() {
        return ResponseEntity.ok(service.buscarTodas());
    }

    // GET /api/despesas/{id} - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Despesa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // POST /api/despesas - Criar nova
    @PostMapping
    public ResponseEntity<Despesa> criar(@RequestBody Despesa despesa) {
        return ResponseEntity.ok(service.salvar(despesa));
    }

    // PUT /api/despesas/{id} - Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody Despesa despesa) {
        despesa.setIdDespesa(id);
        return ResponseEntity.ok(service.salvar(despesa));
    }

    // DELETE /api/despesas/{id} - Deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}