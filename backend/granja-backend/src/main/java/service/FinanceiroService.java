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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FinanceiroService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private DespesaRepository despesaRepository;

    public ResumoFinanceiroDTO gerarResumo(LocalDate dataInicio, LocalDate dataFim) {

        ResumoFinanceiroDTO resumo = new ResumoFinanceiroDTO();

        LocalDate inicio;
        if (dataInicio == null) {
            inicio = LocalDate.of(2000, 1, 1);
        } else {
            inicio = dataInicio;
        }

        LocalDate fim;
        if (dataFim == null) {
            fim = LocalDate.now();
        } else {
            fim = dataFim;
        }

        resumo.setDataInicio(inicio);
        resumo.setDataFim(fim);

        List<Receita> todasReceitas = receitaRepository.findAll();
        List<Despesa> todasDespesas = despesaRepository.findAll();

        List<Receita> receitasDoPeriodo = new ArrayList<>();
        for (Receita receita : todasReceitas) {
            if (!receita.getData().isBefore(inicio) && !receita.getData().isAfter(fim)) {
                receitasDoPeriodo.add(receita);
            }
        }

        List<Despesa> despesasDoPeriodo = new ArrayList<>();
        for (Despesa despesa : todasDespesas) {
            if (!despesa.getData().isBefore(inicio) && !despesa.getData().isAfter(fim)) {
                despesasDoPeriodo.add(despesa);
            }
        }

        BigDecimal totalReceitas = BigDecimal.ZERO;
        for (Receita receita : receitasDoPeriodo) {
            if (receita.getValorTotal() != null) {
                totalReceitas = totalReceitas.add(receita.getValorTotal());
            }
        }

        BigDecimal totalDespesas = BigDecimal.ZERO;
        for (Despesa despesa : despesasDoPeriodo) {
            if (despesa.getValorTotal() != null) {
                totalDespesas = totalDespesas.add(despesa.getValorTotal());
            }
        }

        resumo.setTotalReceitas(totalReceitas);
        resumo.setTotalDespesas(totalDespesas);

        BigDecimal saldo = totalReceitas.subtract(totalDespesas);
        resumo.setSaldo(saldo);

        Map<String, BigDecimal> receitasPorCategoria = new HashMap<>();

        for (Receita receita : receitasDoPeriodo) {
            String categoria = receita.getCategoria();
            BigDecimal valor = receita.getValorTotal();

            if (receitasPorCategoria.containsKey(categoria)) {
                BigDecimal valorAtual = receitasPorCategoria.get(categoria);
                receitasPorCategoria.put(categoria, valorAtual.add(valor));
            } else {
                receitasPorCategoria.put(categoria, valor);
            }
        }

        Map<String, BigDecimal> despesasPorCategoria = new HashMap<>();

        for (Despesa despesa : despesasDoPeriodo) {
            String categoria = despesa.getCategoria();
            BigDecimal valor = despesa.getValorTotal();

            if (despesasPorCategoria.containsKey(categoria)) {
                BigDecimal valorAtual = despesasPorCategoria.get(categoria);
                despesasPorCategoria.put(categoria, valorAtual.add(valor));
            } else {
                despesasPorCategoria.put(categoria, valor);
            }
        }

        resumo.setReceitasPorCategoria(receitasPorCategoria);
        resumo.setDespesasPorCategoria(despesasPorCategoria);

        return resumo;
    }
}