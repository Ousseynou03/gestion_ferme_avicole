package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Client;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/client")
public interface ClientRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutClient(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Client>> getAllClient();

    @PostMapping("/update")
    ResponseEntity<String> updateClient(@RequestBody(required = true) Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteClient(@PathVariable Integer id);
}
