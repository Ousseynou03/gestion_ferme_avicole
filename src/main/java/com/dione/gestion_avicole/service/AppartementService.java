package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface AppartementService {

    ResponseEntity<String> ajoutAppartement(Map<String, String> requestMap);

    ResponseEntity<List<Appartement>> getAllAppartement();

   // ResponseEntity<String> updateAppartement(Map<String, String> requestMap);
   ResponseEntity<String> updateAppartement(Integer appartementId, Map<String, String> requestMap);

    ResponseEntity<String> deleteAppartement(Integer id);
}
