package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Tresorerie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface TresorerieService {

    ResponseEntity<String> ajoutTresorerie(@RequestBody(required = true) Map<String, String> requestMap);

    ResponseEntity<List<Tresorerie>> getAllTresorerie();

   // ResponseEntity<String> updateTresorerie(@RequestBody(required = true) Map<String, String> requestMap);
   ResponseEntity<String> updateTresorerie(Integer tresorerieId, Map<String, String> requestMap);

    ResponseEntity<String> deleteTresorerie(@PathVariable Integer id);

    Integer sommeTotaleTresorerie();
}
