package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Bande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BandeDao extends JpaRepository<Bande,Integer> {


    Bande getBandeById(@Param("id") Integer id);
    List<Bande> getLatestThreeBandes();
    Long countTotalBande();

    @Query(value = "SELECT SUM(b.effectifdepart - COALESCE(m.effectif, 0)) AS total_effectif_restant\n" +
            "FROM bande b\n" +
            "LEFT JOIN mortalite m ON b.id = m.bande_id_mortalite\n" +
            "WHERE b.cloture = false;\n", nativeQuery = true)
    Integer totalPouleRestant();
}
