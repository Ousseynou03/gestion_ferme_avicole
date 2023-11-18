package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;


public interface BatimentService {

    ResponseEntity<String> ajoutBatiment(Map<String, String> requestMap);

    ResponseEntity<List<Batiment>> getAllBatiment();

    ResponseEntity<String> updateBatiment(Map<String, String> requestMap);

    ResponseEntity<String> deleteBatiment(Integer id);

    ResponseEntity<String> getBatimentDesignationById(Integer id);

    Long countTotalBatiments();

}
