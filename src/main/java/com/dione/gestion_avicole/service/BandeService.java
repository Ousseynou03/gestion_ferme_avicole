package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface BandeService {

    ResponseEntity<String> ajoutBande(Map<String, String> requestMap);

    ResponseEntity<List<Bande>> getAllBande();

    ResponseEntity<String> updateBande(Map<String, String> requestMap);

    ResponseEntity<String> deleteBande(Integer id);
}
