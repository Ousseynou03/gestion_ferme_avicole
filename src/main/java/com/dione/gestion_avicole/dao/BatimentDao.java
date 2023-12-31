package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Batiment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BatimentDao extends JpaRepository<Batiment,Integer> {

    Optional<Batiment> findByDesignation(String designation);

    //Récupération du nombre total de batiment dans la ferme

    Long countTotalBatiments();

}
