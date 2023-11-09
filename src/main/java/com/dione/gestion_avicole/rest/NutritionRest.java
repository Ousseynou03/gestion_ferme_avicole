package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.Nutrition;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RequestMapping("/nutrition")
public interface NutritionRest {


    @PostMapping("/add")
    ResponseEntity<String> ajoutNutrition(@RequestBody(required = true) Map<String, String> requestMap);


    @GetMapping("/all")
    ResponseEntity<List<Nutrition>> getAllNutrition();


    @PostMapping("/update")
    ResponseEntity<String> updateNutrition(@RequestBody(required = true) Map<String, String> requestMap);


    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteNutrition(@PathVariable Integer id);
}
