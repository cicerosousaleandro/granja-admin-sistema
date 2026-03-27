package com.granja.admin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ALIMENTACAO")
public class Alimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAlimentacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_animal", nullable = false)
    private Animal animal;

    @NotNull(message = "Data é obrigatória")
    @PastOrPresent(message = "Data não pode ser no futuro")
    private LocalDate data;

    @NotNull(message = "Quantidade é obrigatória")
    @DecimalMin(value = "0.01", message = "Quantidade deve ser maior que 0")
    @Column(name = "quantidade_kg", precision = 10, scale = 2)
    private BigDecimal quantidadeKg;

    private String tipoRacao;
    private String observacoes;

    @Column(name = "data_registro", updatable = false)
    private LocalDateTime dataRegistro;

    public Alimentacao() {
        this.dataRegistro = LocalDateTime.now();
    }

    public Long getIdAlimentacao() {
        return idAlimentacao;
    }

    public void setIdAlimentacao(Long idAlimentacao) {
        this.idAlimentacao = idAlimentacao;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public BigDecimal getQuantidadeKg() {
        return quantidadeKg;
    }

    public void setQuantidadeKg(BigDecimal quantidadeKg) {
        this.quantidadeKg = quantidadeKg;
    }

    public String getTipoRacao() {
        return tipoRacao;
    }

    public void setTipoRacao(String tipoRacao) {
        this.tipoRacao = tipoRacao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    @Override
    public String toString() {
        return "Alimentacao{" +
                "idAlimentacao=" + idAlimentacao +
                ", data=" + data +
                ", quantidadeKg=" + quantidadeKg +
                ", tipoRacao='" + tipoRacao + '\'' +
                '}';
    }
}