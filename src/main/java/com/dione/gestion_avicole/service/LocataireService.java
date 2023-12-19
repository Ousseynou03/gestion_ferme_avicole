package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Locataire;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface LocataireService {

    ResponseEntity<String> ajoutLocataire(Map<String, String> requestMap);

    ResponseEntity<List<Locataire>> getAllLocataire();

   // ResponseEntity<String> updateLocataire(Map<String, String> requestMap);
   ResponseEntity<String> updateLocataire(Integer locataireId, Map<String, String> requestMap);

    ResponseEntity<String> deleteLocataire(Integer id);
}
