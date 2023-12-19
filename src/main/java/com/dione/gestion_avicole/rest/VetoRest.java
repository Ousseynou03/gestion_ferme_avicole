package com.dione.gestion_avicole.rest;


import com.dione.gestion_avicole.POJO.Veterinaire;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/veto")
public interface VetoRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutVeto(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Veterinaire>> getAllVeto();

/*    @PostMapping("/update")
    ResponseEntity<String> updateVeto(@RequestBody(required = true) Map<String, String> requestMap);*/
    @PutMapping("/update/{vetoId}")
    ResponseEntity<String> updateVeto(@PathVariable Integer vetoId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteVeto(@PathVariable Integer id);


}
