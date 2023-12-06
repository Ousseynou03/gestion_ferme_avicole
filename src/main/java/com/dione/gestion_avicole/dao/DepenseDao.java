package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Depense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DepenseDao extends JpaRepository<Depense,Integer> {

    @Query(value = "SELECT SUM(montant) FROM depense WHERE bande_id_depense IN (SELECT id FROM bande WHERE cloture = 'Non')", nativeQuery = true)
    Integer totalDepense();
}
