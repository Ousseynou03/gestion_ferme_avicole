package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Paiement;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface PaiementService {

    ResponseEntity<String> ajoutPaiement(Map<String, String> requestMap);

    ResponseEntity<List<Paiement>> getAllPaiement();

   // ResponseEntity<String> updatePaiement(Map<String, String> requestMap);

    ResponseEntity<String> updatePaiement(Integer paiementId, Map<String, String> requestMap);

    ResponseEntity<String> deletePaiement(Integer id);
}
