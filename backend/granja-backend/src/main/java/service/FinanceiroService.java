package com.granja.admin.service;

import com.granja.admin.dto.ResumoFinanceiroDTO;
import com.granja.admin.model.Despesa;
import com.granja.admin.model.Receita;
import com.granja.admin.repository.DespesaRepository;
import com.granja.admin.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FinanceiroService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private DespesaRepository despesaRepository;

    /**
     * Gera resumo financeiro do período (ou todos os registros se datas não informadas)
     */
    public ResumoFinanceiroDTO gerarResumo(LocalDate dataInicio, LocalDate dataFim) {
        ResumoFinanceiroDTO resumo = new ResumoFinanceiroDTO();

        // CORREÇÃO: Cria variáveis finais para usar no lambda
        final LocalDate inicio;
        final LocalDate fim;

        if (dataInicio == null) {
            inicio = LocalDate.of(2000, 1, 1);
        } else {
            inicio = dataInicio;
        }

        if (dataFim == null) {
            fim = LocalDate.now();
        } else {
            fim = dataFim;
        }

        resumo.setDataInicio(inicio);
        resumo.setDataFim(fim);

        // Busca receitas e despesas do período
        List<Receita> receitas = receitaRepository.findAll();
        List<Despesa> despesas = despesaRepository.findAll();

        // Filtra por período (agora usa variáveis final)
        List<Receita> receitasFiltradas = receitas.stream()
                .filter(r -> !r.getData().isBefore(inicio) && !r.getData().isAfter(fim))
                .collect(Collectors.toList());

        List<Despesa> despesasFiltradas = despesas.stream()
                .filter(d -> !d.getData().isBefore(inicio) && !d.getData().isAfter(fim))
                .collect(Collectors.toList());

        // Calcula totais
        BigDecimal totalReceitas = receitasFiltradas.stream()
                .map(Receita::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDespesas = despesasFiltradas.stream()
                .map(Despesa::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        resumo.setTotalReceitas(totalReceitas);
        resumo.setTotalDespesas(totalDespesas);
        resumo.setSaldo(totalReceitas.subtract(totalDespesas));

        // Agrupa por categoria
        Map<String, BigDecimal> receitasPorCategoria = receitasFiltradas.stream()
                .collect(Collectors.groupingBy(
                        Receita::getCategoria,
                        Collectors.reducing(BigDecimal.ZERO, Receita::getValor, BigDecimal::add)
                ));

        Map<String, BigDecimal> despesasPorCategoria = despesasFiltradas.stream()
                .collect(Collectors.groupingBy(
                        Despesa::getCategoria,
                        Collectors.reducing(BigDecimal.ZERO, Despesa::getValor, BigDecimal::add)
                ));

        resumo.setReceitasPorCategoria(receitasPorCategoria);
        resumo.setDespesasPorCategoria(despesasPorCategoria);

        return resumo;
    }
}