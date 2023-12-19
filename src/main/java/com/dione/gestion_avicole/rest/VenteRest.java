package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Depense;
import com.dione.gestion_avicole.POJO.Vente;
import com.dione.gestion_avicole.service.VenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/vente")
public interface VenteRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutVente(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Vente>> getAllVente();


/*    @PostMapping("/update")
    ResponseEntity<String> updateVente(@RequestBody(required = true) Map<String, String> requestMap);*/
    @PutMapping("/update/{venteId}")
    ResponseEntity<String> updateVente(@PathVariable Integer venteId, @RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteVente(@PathVariable Integer id);

    @GetMapping("/ventePoulets")
    Integer sommeTotalVentePoulet();

    @GetMapping("/venteOeufs")
    Integer sommeTotalVenteOeuf();

    @GetMapping("/nbrOeufVendu")
    Integer nbrOeufVendu();
}
