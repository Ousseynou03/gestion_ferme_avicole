package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Tresorerie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/tresorerie")
public interface TresorerieRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutTresorerie(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Tresorerie>> getAllTresorerie();

/*
    @PostMapping("/update")
    ResponseEntity<String> updateTresorerie(@RequestBody(required = true) Map<String, String> requestMap);
*/
    @PutMapping("/update/{tresorerieId}")
    ResponseEntity<String> updateTresorerie(@PathVariable Integer tresorerieId, @RequestBody(required = true) Map<String, String> requestMap);



    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteTresorerie(@PathVariable Integer id);

    @GetMapping("/solde")
    Integer sommeTotaleTresorerie();
}
