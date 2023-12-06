package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VenteDao extends JpaRepository<Vente,Integer> {

    @Query(value = "SELECT SUM(montant)\n" +
            "FROM vente\n" +
            "WHERE description = 'ACHAT_POULET' AND bande_id_vente IN (SELECT id FROM bande WHERE cloture = 'Non')", nativeQuery = true)
    Integer sommeTotalVentePoulet();


    @Query(value = "SELECT SUM(montant)\n" +
            "FROM vente\n" +
            "WHERE description = 'ACHAT_OEUF' AND bande_id_vente IN (SELECT id FROM bande WHERE cloture = 'Non ')", nativeQuery = true)
    Integer sommeTotalVenteOeuf();


    @Query(value = "SELECT SUM(quantite) FROM Vente v JOIN Bande b ON v.bande_id_vente = b.id WHERE v.description = 'ACHAT_OEUF' AND b.cloture = 'Non'",
            nativeQuery = true)
    Integer nbrOeufVendu();
}
