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
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String nome;

    @NotBlank(message = "Espécie é obrigatória")
    @Pattern(regexp = "^(Bovino|Galinha|Porco|Ovelha|Cavalo|Pato|Ganso)$",
            message = "Espécie inválida")
    private String especie;

    private String raca;

    @NotNull(message = "Data de nascimento é obrigatória")
    @Past(message = "Data de nascimento não pode ser no futuro")
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @NotNull(message = "Peso é obrigatório")
    @DecimalMin(value = "0.1", message = "Peso deve ser maior que 0")
    @Column(name = "peso_atual")
    private BigDecimal pesoAtual;

    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "^(Ativo|Vendido|Abatido|Doente)$",
            message = "Status inválido")
    private String status;

    private String localizacao;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    // Construtor
    public Animal() {
        this.dataCadastro = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getIdAnimal() { return idAnimal; }
    public void setIdAnimal(Long idAnimal) { this.idAnimal = idAnimal; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEspecie() { return especie; }
    public void setEspecie(String especie) { this.especie = especie; }

    public String getRaca() { return raca; }
    public void setRaca(String raca) { this.raca = raca; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public BigDecimal getPesoAtual() { return pesoAtual; }
    public void setPesoAtual(BigDecimal pesoAtual) { this.pesoAtual = pesoAtual; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }

    // Método utilitário
    public int calcularIdade() {
        if (dataNascimento != null) {
            return java.time.Period.between(dataNascimento, LocalDate.now()).getYears();
        }
        return 0;
    }

    @Override
    public String toString() {
        return "Animal{" +
                "idAnimal=" + idAnimal +
                ", nome='" + nome + '\'' +
                ", especie='" + especie + '\'' +
                ", pesoAtual=" + pesoAtual +
                ", status='" + status + '\'' +
                '}';
    }
}