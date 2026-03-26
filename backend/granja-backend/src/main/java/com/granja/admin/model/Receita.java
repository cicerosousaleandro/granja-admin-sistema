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

    @NotNull(message = "Quantidade é obrigatória")
    @DecimalMin(value = "0.01", message = "Quantidade deve ser maior que 0")
    @Column(name = "quantidade", precision = 10, scale = 2)
    private BigDecimal quantidade;

    @NotNull(message = "Preço unitário é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que 0")
    @Column(name = "preco_unitario", precision = 10, scale = 2)
    private BigDecimal precoUnitario;

    @NotNull(message = "Valor total é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor total deve ser maior que 0")
    @Column(name = "valor_total", precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @NotBlank(message = "Categoria é obrigatória")
    @Pattern(regexp = "^(Venda de Ovos|Venda de Aves|Subsídio|Serviços|Outros)$",
            message = "Categoria inválida")
    private String categoria;

    private String observacoes;

    @Column(name = "data_registro", updatable = false)
    private LocalDateTime dataRegistro;

    // Construtor
    public Receita() {
        this.dataRegistro = LocalDateTime.now();
    }

    // Método para calcular valor total automaticamente
    public void calcularValorTotal() {
        if (this.quantidade != null && this.precoUnitario != null) {
            this.valorTotal = this.quantidade.multiply(this.precoUnitario);
        }
    }

    // Getters e Setters
    public Long getIdReceita() { return idReceita; }
    public void setIdReceita(Long idReceita) { this.idReceita = idReceita; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getQuantidade() { return quantidade; }
    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
        calcularValorTotal();
    }

    public BigDecimal getPrecoUnitario() { return precoUnitario; }
    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
        calcularValorTotal();
    }

    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }

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
                ", quantidade=" + quantidade +
                ", precoUnitario=" + precoUnitario +
                ", valorTotal=" + valorTotal +
                ", categoria='" + categoria + '\'' +
                '}';
    }
}