package com.granja.admin.repository;

import com.granja.admin.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    // Busca receitas por categoria
    List<Receita> findByCategoria(String categoria);
}