package com.granja.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

public class ResumoFinanceiroDTO {

    private LocalDate dataInicio;
    private LocalDate dataFim;
    private BigDecimal totalReceitas;
    private BigDecimal totalDespesas;
    private BigDecimal saldo;
    private Map<String, BigDecimal> receitasPorCategoria;
    private Map<String, BigDecimal> despesasPorCategoria;

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public BigDecimal getTotalReceitas() {
        return totalReceitas;
    }

    public void setTotalReceitas(BigDecimal totalReceitas) {
        this.totalReceitas = totalReceitas;
    }

    public BigDecimal getTotalDespesas() {
        return totalDespesas;
    }

    public void setTotalDespesas(BigDecimal totalDespesas) {
        this.totalDespesas = totalDespesas;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public Map<String, BigDecimal> getReceitasPorCategoria() {
        return receitasPorCategoria;
    }

    public void setReceitasPorCategoria(Map<String, BigDecimal> receitasPorCategoria) {
        this.receitasPorCategoria = receitasPorCategoria;
    }

    public Map<String, BigDecimal> getDespesasPorCategoria() {
        return despesasPorCategoria;
    }

    public void setDespesasPorCategoria(Map<String, BigDecimal> despesasPorCategoria) {
        this.despesasPorCategoria = despesasPorCategoria;
    }
}