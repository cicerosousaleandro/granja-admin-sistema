package com.granja.admin.repository;

import com.granja.admin.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT a FROM Animal a WHERE a.especie = :especie")
    List<Animal> buscarPorEspecie(@Param("especie") String especie);

    @Query("SELECT a FROM Animal a WHERE a.status = :status")
    List<Animal> buscarPorStatus(@Param("status") String status);

    @Query("SELECT a FROM Animal a WHERE a.nome LIKE %:nome%")
    List<Animal> buscarPorNome(@Param("nome") String nome);
}