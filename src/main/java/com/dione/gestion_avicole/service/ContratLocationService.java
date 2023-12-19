package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.ContratLocation;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ContratLocationService {


    ResponseEntity<String> ajoutContratLocation(Map<String, String> requestMap);

    ResponseEntity<List<ContratLocation>> getAllContratLocation();

   // ResponseEntity<String> updateContratLocation(Map<String, String> requestMap);

    ResponseEntity<String> updateContratLocation(Integer contratId, Map<String, String> requestMap);


    ResponseEntity<String> deleteContratLocation(Integer id);
}
