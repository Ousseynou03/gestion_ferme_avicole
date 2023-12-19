package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.POJO.Ramassage;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/ramassage")
public interface RamassageRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutRamassage(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Ramassage>> getAllRamassage();

/*    @PostMapping("/update")
    ResponseEntity<String> updateRamassage(@RequestBody(required = true) Map<String, String> requestMap);*/

    @PutMapping("/update/{ramassageId}")
    ResponseEntity<String> updateRamassage(@PathVariable Integer ramassageId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteRamassage(@PathVariable Integer id);

    @GetMapping("nbreTotalOeufRamassage")
    Integer nbreTotalOeufRamassage();

    @GetMapping("/nbreOeufPerdu")
    Integer NbreOeufPerdu();

    @GetMapping("/totalOeufs")
    Integer totalOeuf();


}
