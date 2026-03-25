package com.granja.admin.controller;

import com.granja.admin.dto.ResumoFinanceiroDTO;
import com.granja.admin.service.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/financeiro")
public class FinanceiroController {

    @Autowired
    private FinanceiroService service;

    /**
     * GET /api/financeiro/resumo
     * Retorna resumo financeiro com totais e agrupamento por categoria
     *
     * Parâmetros opcionais:
     * - dataInicio: filtra receitas/despesas a partir desta data
     * - dataFim: filtra receitas/despesas até esta data
     *
     * Exemplo: /api/financeiro/resumo?dataInicio=2026-03-01&dataFim=2026-03-31
     */
    @GetMapping("/resumo")
    public ResponseEntity<ResumoFinanceiroDTO> gerarResumo(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {

        ResumoFinanceiroDTO resumo = service.gerarResumo(dataInicio, dataFim);
        return ResponseEntity.ok(resumo);
    }

    /**
     * GET /api/financeiro/resumo/mes-atual
     * Retorna resumo do mês corrente
     */
    @GetMapping("/resumo/mes-atual")
    public ResponseEntity<ResumoFinanceiroDTO> resumoMesAtual() {
        LocalDate primeiroDia = LocalDate.now().withDayOfMonth(1);
        LocalDate ultimoDia = LocalDate.now().withDayOfMonth(
                LocalDate.now().lengthOfMonth()
        );

        ResumoFinanceiroDTO resumo = service.gerarResumo(primeiroDia, ultimoDia);
        return ResponseEntity.ok(resumo);
    }

    /**
     * GET /api/financeiro/resumo/ano-atual
     * Retorna resumo do ano corrente
     */
    @GetMapping("/resumo/ano-atual")
    public ResponseEntity<ResumoFinanceiroDTO> resumoAnoAtual() {
        LocalDate primeiroDia = LocalDate.now().withDayOfYear(1);
        LocalDate ultimoDia = LocalDate.now().withDayOfYear(
                LocalDate.now().lengthOfYear()
        );

        ResumoFinanceiroDTO resumo = service.gerarResumo(primeiroDia, ultimoDia);
        return ResponseEntity.ok(resumo);
    }
}