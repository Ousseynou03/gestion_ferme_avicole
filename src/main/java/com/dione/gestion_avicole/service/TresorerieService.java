package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Tresorerie;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TresorerieService {

    ResponseEntity<String> ajoutTresorerie(Map<String, String> requestMap);

    ResponseEntity<List<Tresorerie>> getAllTresorerie();

    ResponseEntity<String> updateTresorerie(Map<String, String> requestMap);

    ResponseEntity<String> deleteTresorerie(Integer id);
}
