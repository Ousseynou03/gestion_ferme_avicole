package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Ramassage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RamassageDao extends JpaRepository<Ramassage,Integer> {

    @Query(value = "SELECT SUM(quantite) FROM Ramassage\n", nativeQuery = true)
    Integer nbreTotalOeufRamassage();

    @Query(value = "SELECT SUM(nbr_oeuf_perdu) FROM Ramassage;", nativeQuery = true)
    Integer NbreOeufPerdu();

    @Query(value = "SELECT (SELECT COALESCE(SUM(quantite), 0) FROM Ramassage) - (SELECT COALESCE(SUM(nbr_oeuf_perdu), 0) FROM Ramassage) - (SELECT COALESCE(SUM(v.quantite), 0) FROM Vente v JOIN Bande b ON v.bande_id_vente = b.id WHERE v.description = 'ACHAT_OEUF' AND b.cloture = 'Non') AS totalOeuf;", nativeQuery = true)
    Integer totalOeuf();

}
