package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Bande;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("bande")
public interface BandeRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutBande(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Bande>> getAllBande();


    @PostMapping("/update")
    ResponseEntity<String> updateBande(@RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteBande(@PathVariable Integer id);


    @GetMapping("/getById/{id}")
    ResponseEntity<Bande> getBandeById(@PathVariable Integer id);

    @GetMapping("/getLatestBandes")
    ResponseEntity<List<Bande>> getLatestThreeBandes();
}
