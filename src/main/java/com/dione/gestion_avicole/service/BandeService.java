package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface BandeService {

    ResponseEntity<String> ajoutBande(Map<String, String> requestMap);

    ResponseEntity<List<Bande>> getAllBande();

    //ResponseEntity<String> updateBande(Map<String, String> requestMap);
    ResponseEntity<String> updateBande(Integer bandeId, Map<String, String> requestMap);


    ResponseEntity<String> deleteBande(Integer id);

    ResponseEntity<Bande> getBandeById(Integer id);

    ResponseEntity<List<Bande>> getLatestThreeBandes();
    Long countTotalBande();

    Integer totalPouleRestant();

    public byte[] genererRapport(Integer bandeId);








}
