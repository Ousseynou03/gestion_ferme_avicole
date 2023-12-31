package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Nutrition;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.NutritionRest;
import com.dione.gestion_avicole.service.NutritionService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class NutritionRestImpl implements NutritionRest {


    private final NutritionService nutritionService;

    public NutritionRestImpl(NutritionService nutritionService) {
        this.nutritionService = nutritionService;
    }

    @Override
    public ResponseEntity<String> ajoutNutrition(Map<String, String> requestMap) {
        try {
            return nutritionService.ajoutNutrition(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Nutrition>> getAllNutrition() {
        try {
            return nutritionService.getAllNutrition();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateNutrition(Map<String, String> requestMap) {
        try {
            return nutritionService.updateNutrition(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
@Override
public ResponseEntity<String> updateNutrition(Integer nutritionId, Map<String, String> requestMap) {
    try {
        return nutritionService.updateNutrition(nutritionId, requestMap);
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
}


    @Override
    public ResponseEntity<String> deleteNutrition(Integer id) {
        try {
            return nutritionService.deleteNutrition(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Double stockAliment() {
        try {
            return nutritionService.stockAliment();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de la quantite du stock.", ex);
        }
    }

    @Override
    public Double alimentsConsommes() {
        try {
            return nutritionService.alimentsConsommes();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des aliments consommés.", ex);
        }
    }
}
