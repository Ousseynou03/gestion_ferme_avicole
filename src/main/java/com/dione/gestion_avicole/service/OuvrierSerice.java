package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Ouvrier;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OuvrierSerice {

    ResponseEntity<String> ajoutOuvrier(Map<String, String> requestMap);

    ResponseEntity<List<Ouvrier>> getAllOuvrier();

    ResponseEntity<String> updateOuvrier(Map<String, String> requestMap);

    ResponseEntity<String> deleteOuvrier(Integer id);

}
