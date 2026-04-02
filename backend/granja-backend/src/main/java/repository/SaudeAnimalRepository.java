package com.granja.admin.repository;

import com.granja.admin.model.SaudeAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SaudeAnimalRepository extends JpaRepository<SaudeAnimal, Long> {


    List<SaudeAnimal> findByAnimalIdAnimal(Long idAnimal);
}