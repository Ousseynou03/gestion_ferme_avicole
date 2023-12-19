package com.dione.gestion_avicole.rest;


import com.dione.gestion_avicole.POJO.Paiement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/paiement")
public interface PaiementRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutPaiement(Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Paiement>> getAllPaiement();

/*    @PostMapping("/update")
    ResponseEntity<String> updatePaiement(Map<String, String> requestMap);*/
    @PutMapping("/update/{paiementId}")
    ResponseEntity<String> updatePaiement(@PathVariable Integer paiementId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deletePaiement(Integer id);
}
