package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Depense;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface DepenseService {

    ResponseEntity<String> ajoutDepense(Map<String, String> requestMap);

    ResponseEntity<List<Depense>> getAllDepense();

   // ResponseEntity<String> updateDepense(Map<String, String> requestMap);
   ResponseEntity<String> updateDepense(Integer depenseId, Map<String, String> requestMap);

    ResponseEntity<String> deleteDepense(Integer id);

    Integer totalDepense();
}
