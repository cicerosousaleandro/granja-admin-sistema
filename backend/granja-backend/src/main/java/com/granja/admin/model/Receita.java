package com.granja.admin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "RECEITAS")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReceita;

    @NotNull(message = "Data é obrigatória")
    @PastOrPresent(message = "Data não pode ser no futuro")
    private LocalDate data;

    @NotBlank(message = "Descrição é obrigatória")
    @Column(length = 500)
    private String descricao;

    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor deve ser maior que 0")
    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @NotBlank(message = "Categoria é obrigatória")
    @Pattern(regexp = "^(Venda de Animais|Venda de Produtos|Subsídio|Outros)$",
            message = "Categoria inválida")
    private String categoria;

    private String observacoes;

    @Column(name = "data_registro", updatable = false)
    private LocalDateTime dataRegistro;

    // Construtor
    public Receita() {
        this.dataRegistro = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getIdReceita() { return idReceita; }
    public void setIdReceita(Long idReceita) { this.idReceita = idReceita; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public LocalDateTime getDataRegistro() { return dataRegistro; }

    @Override
    public String toString() {
        return "Receita{" +
                "idReceita=" + idReceita +
                ", data=" + data +
                ", descricao='" + descricao + '\'' +
                ", valor=" + valor +
                ", categoria='" + categoria + '\'' +
                '}';
    }
}