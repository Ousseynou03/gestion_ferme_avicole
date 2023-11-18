package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Bande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BandeDao extends JpaRepository<Bande,Integer> {


    Bande getBandeById(@Param("id") Integer id);
    List<Bande> getLatestThreeBandes();
    Long countTotalBande();
}
