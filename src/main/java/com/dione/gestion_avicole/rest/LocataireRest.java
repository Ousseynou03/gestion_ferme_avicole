package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Locataire;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/locataire")
public interface LocataireRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutLocataire(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Locataire>> getAllLocataire();

    @PostMapping("/update")
    ResponseEntity<String> updateLocataire(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteLocataire(@PathVariable Integer id);
}
