package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Ouvrier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/ouvrier")
public interface OuvrierRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutOuvrier(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Ouvrier>> getAllOuvrier();

    @PostMapping("/update")
    ResponseEntity<String> updateOuvrier(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteOuvrier(@PathVariable Integer id);
}
