package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Veterinaire;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface VetoService {

    ResponseEntity<String> ajoutVeto(Map<String, String> requestMap);

    ResponseEntity<List<Veterinaire>> getAllVeto();

    ResponseEntity<String> updateVeto(Map<String, String> requestMap);

    ResponseEntity<String> deleteVeto(Integer id);


}
