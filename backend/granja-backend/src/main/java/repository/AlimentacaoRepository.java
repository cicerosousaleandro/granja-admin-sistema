package com.granja.admin.repository;

import com.granja.admin.model.Alimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlimentacaoRepository extends JpaRepository<Alimentacao, Long> {

    // Busca todas as alimentações de um animal específico
    List<Alimentacao> findByAnimalIdAnimal(Long idAnimal);
}