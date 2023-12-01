package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface MortaliteService {

    ResponseEntity<String> ajoutMortalite(Map<String, String> requestMap);

    ResponseEntity<List<Mortalite>> getAllMortalite();

    ResponseEntity<String> updateMortalite(Map<String, String> requestMap);

    ResponseEntity<String> deleteMortalite(Integer id);

    Integer totalMortalite();
}
