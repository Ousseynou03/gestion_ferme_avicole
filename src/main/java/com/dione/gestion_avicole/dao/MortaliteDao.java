package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MortaliteDao extends JpaRepository<Mortalite,Integer> {

    @Query(value = "SELECT SUM(m.effectif)\n" +
            "FROM mortalite m\n" +
            "JOIN bande b ON m.bande_id_mortalite = b.id\n" +
            "WHERE b.cloture = 'Non';\n", nativeQuery = true)
    Integer totalMortalite();

}
