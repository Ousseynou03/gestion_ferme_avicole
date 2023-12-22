package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Depense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepenseDao extends JpaRepository<Depense,Integer> {

    @Query(value = "SELECT SUM(montant) FROM depense WHERE bande_id_depense IN (SELECT id FROM bande WHERE cloture = 'Non')", nativeQuery = true)
    Integer totalDepense();


    List<Depense> findByBandeId(Integer bandeId);



    @Query("SELECT SUM(d.montant) FROM Depense d WHERE d.bande.id =: bandeId")
    List<Object[]> getTotalMontantByCategorieForDepenseBande(@Param("bandeId") Integer bandeId);


    @Query("SELECT d.categorie, SUM(d.montant) FROM Depense d WHERE d.bande.id = :bandeId GROUP BY d.categorie")
    List<Object[]> getTotalMontantByCategorieForBande(@Param("bandeId") Integer bandeId);



}
