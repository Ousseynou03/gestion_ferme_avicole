package com.dione.gestion_avicole.rest;


import com.dione.gestion_avicole.POJO.Batiment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("batiment")
public interface BatimentRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutBatiment(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Batiment>> getAllBatiment();

    @PostMapping("/update")
    ResponseEntity<String> updateBatiment(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteBatiment(@PathVariable Integer id);


}
