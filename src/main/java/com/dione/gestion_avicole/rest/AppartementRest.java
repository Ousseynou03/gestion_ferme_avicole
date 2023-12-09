package com.dione.gestion_avicole.rest;


import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/appartement")
public interface AppartementRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutAppartement(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Appartement>> getAllAppartement();

    @PostMapping("/update")
    ResponseEntity<String> updateAppartement(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteAppartement(@PathVariable Integer id);
}
