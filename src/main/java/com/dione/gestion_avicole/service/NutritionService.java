package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Nutrition;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface NutritionService {


    ResponseEntity<String> ajoutNutrition(Map<String, String> requestMap);

    ResponseEntity<List<Nutrition>> getAllNutrition();

   // ResponseEntity<String> updateNutrition(Map<String, String> requestMap);
   ResponseEntity<String> updateNutrition(Integer nutritionId, Map<String, String> requestMap);

    ResponseEntity<String> deleteNutrition(Integer id);

    Double stockAliment();

    Double alimentsConsommes();
}
