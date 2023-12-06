package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Nutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NutritionDao extends JpaRepository<Nutrition,Integer> {

    @Query(value = "SELECT SUM(quantite) FROM Nutrition WHERE epuisee = 'Non'", nativeQuery = true)
    Double stockAliment();



    @Query(value = "SELECT SUM(quantite_sortie)\n" +
            "FROM nutrition\n" +
            "INNER JOIN bande ON nutrition.bande_id_nutrition = bande.id\n" +
            "WHERE bande.cloture = 'Non'", nativeQuery = true)
    Double alimentsConsommes();
}
