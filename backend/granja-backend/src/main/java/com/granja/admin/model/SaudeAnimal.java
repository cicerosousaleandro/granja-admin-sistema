package com.granja.admin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "SAUDE_ANIMAL")
public class SaudeAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSaude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_animal", nullable = false)
    private Animal animal;

    @NotNull(message = "Data é obrigatória")
    @PastOrPresent(message = "Data não pode ser no futuro")
    private LocalDate data;

    @NotBlank(message = "Tipo de evento é obrigatório")
    @Pattern(regexp = "^(Vacinação|Tratamento|Consulta|Exame)$",
            message = "Tipo inválido. Valores: Vacinação, Tratamento, Consulta, Exame")
    @Column(name = "tipo_evento")
    private String tipoEvento;

    @NotBlank(message = "Descrição é obrigatória")
    @Column(length = 500)
    private String descricao;

    private String medicamento;

    private String veterinario;

    @Column(name = "data_registro", updatable = false)
    private LocalDateTime dataRegistro;

    // Construtor
    public SaudeAnimal() {
        this.dataRegistro = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getIdSaude() { return idSaude; }
    public void setIdSaude(Long idSaude) { this.idSaude = idSaude; }

    public Animal getAnimal() { return animal; }
    public void setAnimal(Animal animal) { this.animal = animal; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getTipoEvento() { return tipoEvento; }
    public void setTipoEvento(String tipoEvento) { this.tipoEvento = tipoEvento; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getMedicamento() { return medicamento; }
    public void setMedicamento(String medicamento) { this.medicamento = medicamento; }

    public String getVeterinario() { return veterinario; }
    public void setVeterinario(String veterinario) { this.veterinario = veterinario; }

    public LocalDateTime getDataRegistro() { return dataRegistro; }

    @Override
    public String toString() {
        return "SaudeAnimal{" +
                "idSaude=" + idSaude +
                ", tipoEvento='" + tipoEvento + '\'' +
                ", data=" + data +
                '}';
    }
}