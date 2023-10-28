package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Fournisseur;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface FournisseurService {

    ResponseEntity<String> ajoutFournisseur(Map<String, String> requestMap);

    ResponseEntity<List<Fournisseur>> getAllFournisseur();

    ResponseEntity<String> updateFournisseur(Map<String, String> requestMap);

    ResponseEntity<String> deleteFournisseur(Integer id);
}
