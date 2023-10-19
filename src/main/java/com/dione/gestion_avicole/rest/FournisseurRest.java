package com.dione.gestion_avicole.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/fournisseur")
public interface FournisseurRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutFournisseur(@RequestBody(required = true) Map<String, String> requestMap);

}
