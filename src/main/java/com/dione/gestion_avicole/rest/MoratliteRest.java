package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping("/mortalite")
public interface MoratliteRest {

    @PostMapping("/add")
    ResponseEntity<String> ajoutMortalite(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/all")
    ResponseEntity<List<Mortalite>> getAllMortalite();
}
