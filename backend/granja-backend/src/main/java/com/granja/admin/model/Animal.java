package com.granja.admin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ANIMAIS")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnimal;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Espécie é obrigatória")
    @Pattern(regexp = "^(Poedeira Branca|Poedeira Vermelha|Poedeira Caipira|Frango de Corte|Frango Caipira|Galo Reprodutor|Galinha Matriz|Pinto)$",
            message = "Tipo inválido")
    private String especie;

    private String raca;

    @PastOrPresent(message = "Data não pode ser no futuro")
    private LocalDate dataNascimento;

    @NotNull(message = "Peso é obrigatório")
    @DecimalMin(value = "0.01", message = "Peso deve ser maior que 0")
    @Column(name = "peso_atual", precision = 10, scale = 2)
    private BigDecimal pesoAtual;

    @Pattern(regexp = "^(Em Produção|Em Crescimento|Para Abate|Para Reprodução|Para Venda|Doente|Morta)$",
            message = "Status inválido")
    private String status;

    private String localizacao;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    public Animal() {
        this.dataCadastro = LocalDateTime.now();
    }

    public Long getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(Long idAnimal) {
        this.idAnimal = idAnimal;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public BigDecimal getPesoAtual() {
        return pesoAtual;
    }

    public void setPesoAtual(BigDecimal pesoAtual) {
        this.pesoAtual = pesoAtual;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    @Override
    public String toString() {
        return "Animal{" +
                "idAnimal=" + idAnimal +
                ", nome='" + nome + '\'' +
                ", especie='" + especie + '\'' +
                ", raca='" + raca + '\'' +
                ", dataNascimento=" + dataNascimento +
                ", pesoAtual=" + pesoAtual +
                ", status='" + status + '\'' +
                ", localizacao='" + localizacao + '\'' +
                ", dataCadastro=" + dataCadastro +
                '}';
    }
}