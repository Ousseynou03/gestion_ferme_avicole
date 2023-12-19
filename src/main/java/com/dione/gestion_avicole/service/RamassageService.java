package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.POJO.Ramassage;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface RamassageService {


    ResponseEntity<String> ajoutRamassage(Map<String, String> requestMap);

    ResponseEntity<List<Ramassage>> getAllRamassage();

   // ResponseEntity<String> updateRamassage(Map<String, String> requestMap);
   ResponseEntity<String> updateRamassage(Integer ramassageId, Map<String, String> requestMap);

    ResponseEntity<String> deleteRamassage(Integer id);

    Integer nbreTotalOeufRamassage();

    Integer NbreOeufPerdu();

    Integer totalOeuf();


}
