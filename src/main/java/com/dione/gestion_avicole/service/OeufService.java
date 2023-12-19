package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Oeuf;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OeufService {
    ResponseEntity<String> ajoutOeuf(Map<String, String> requestMap);

    ResponseEntity<List<Oeuf>> getAllOeuf();

   // ResponseEntity<String> updateOeuf(Map<String, String> requestMap);
   ResponseEntity<String> updateOeuf(Integer oeufId, Map<String, String> requestMap);

    ResponseEntity<String> deleteOeuf(Integer id);
}
