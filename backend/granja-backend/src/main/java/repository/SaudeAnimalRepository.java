package com.granja.admin.repository;

import com.granja.admin.model.SaudeAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SaudeAnimalRepository extends JpaRepository<SaudeAnimal, Long> {

    // Busca todos os registros de saúde de um animal específico
    List<SaudeAnimal> findByAnimalIdAnimal(Long idAnimal);
}