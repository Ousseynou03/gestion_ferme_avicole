package com.dione.gestion_avicole.rest;


import com.dione.gestion_avicole.POJO.Depense;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/depense")
public interface DepenseRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutDepense(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Depense>> getAllDepense();


/*    @PostMapping("/update")
    ResponseEntity<String> updateDepense(@RequestBody(required = true) Map<String, String> requestMap);*/

    @PutMapping("/update/{depenseId}")
    ResponseEntity<String> updateDepense(@PathVariable Integer depenseId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteDepense(@PathVariable Integer id);

    @GetMapping("/totalDepenses")
    Integer totalDepense();
}
