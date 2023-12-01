package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/mortalite")
public interface MoratliteRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutMortalite(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Mortalite>> getAllMortalite();

    @PostMapping("/update")
    ResponseEntity<String> updateMortalite(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("delete/{id}")
    ResponseEntity<String> deleteMortalite(@PathVariable Integer id);

    @GetMapping("/totalMortalite")
    Integer totalMortalite();
}
