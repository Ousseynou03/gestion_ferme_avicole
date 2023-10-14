package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Batiment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BatimentDao extends JpaRepository<Batiment,Integer> {


    //Liste des Batiments
    //List<String> getAllBatiments();

}
