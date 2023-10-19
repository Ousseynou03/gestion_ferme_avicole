package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface FournisseurService {

    ResponseEntity<String> ajoutFournisseur(Map<String, String> requestMap);

    ResponseEntity<List<Bande>> getAllFournisseur();

    ResponseEntity<String> updateFournisseur(Map<String, String> requestMap);

    ResponseEntity<String> deleteFournisseur(Integer id);
}
