package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Materiel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("materiel")
public interface MaterielRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutMateriel(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Materiel>> getAllMateriel();


    @PostMapping("/update")
    ResponseEntity<String> updateMateriel(@RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteMateriel(Integer id);
}
