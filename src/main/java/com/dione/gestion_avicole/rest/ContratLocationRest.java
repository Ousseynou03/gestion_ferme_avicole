package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.ContratLocation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/contratLocation")
public interface ContratLocationRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutContratLocation(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<ContratLocation>> getAllContratLocation();

 /*   @PostMapping("/update")
    ResponseEntity<String> updateContratLocation(@RequestBody(required = true) Map<String, String> requestMap);*/
     @PutMapping("/update/{contratId}")
     ResponseEntity<String> updateContratLocation(@PathVariable Integer contratId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteContratLocation(@PathVariable Integer id);
}
