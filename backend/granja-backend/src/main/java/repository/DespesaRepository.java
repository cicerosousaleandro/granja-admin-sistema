package com.granja.admin.repository;

import com.granja.admin.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    // Busca despesas por categoria
    List<Despesa> findByCategoria(String categoria);
}