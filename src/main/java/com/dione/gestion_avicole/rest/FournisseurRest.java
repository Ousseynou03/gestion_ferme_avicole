package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Fournisseur;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/fournisseur")
public interface FournisseurRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutFournisseur(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Fournisseur>> getAllFournisseur();

    @PostMapping("/update")
    ResponseEntity<String> updateFournisseur(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteFournisseur(@PathVariable Integer id);

}
