package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Depense;
import com.dione.gestion_avicole.POJO.Vente;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface VenteService {

    ResponseEntity<String> ajoutVente(Map<String, String> requestMap);

    ResponseEntity<List<Vente>> getAllVente();

    ResponseEntity<String> updateVente(Map<String, String> requestMap);

    ResponseEntity<String> deleteVente(Integer id);

}
