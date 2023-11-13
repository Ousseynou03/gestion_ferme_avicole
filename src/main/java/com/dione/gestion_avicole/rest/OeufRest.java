package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Oeuf;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/ponte")
public interface OeufRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutOeuf(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Oeuf>> getAllOeuf();

    @PostMapping("/update")
    ResponseEntity<String> updateOeuf(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteOeuf(@PathVariable Integer id);
}
