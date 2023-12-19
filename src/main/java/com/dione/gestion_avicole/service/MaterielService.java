package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Materiel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface MaterielService {

    ResponseEntity<String> ajoutMateriel(Map<String, String> requestMap);

    ResponseEntity<List<Materiel>> getAllMateriel();

   // ResponseEntity<String> updateMateriel(Map<String, String> requestMap);
   ResponseEntity<String> updateMateriel(Integer materielId, Map<String, String> requestMap);

    ResponseEntity<String> deleteMateriel(Integer id);
}
