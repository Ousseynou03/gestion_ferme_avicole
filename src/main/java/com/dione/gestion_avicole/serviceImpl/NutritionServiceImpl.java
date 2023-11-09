package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Nutrition;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.dao.NutritionDao;
import com.dione.gestion_avicole.service.NutritionService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class NutritionServiceImpl implements NutritionService {


    private NutritionDao nutritionDao;
    private JwtFilter jwtFilter;
    private BatimentDao batimentDao;

    public NutritionServiceImpl(NutritionDao nutritionDao, JwtFilter jwtFilter, BatimentDao batimentDao) {
        this.nutritionDao = nutritionDao;
        this.jwtFilter = jwtFilter;
        this.batimentDao = batimentDao;
    }

    @Override
    public ResponseEntity<String> ajoutNutrition(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateNutritionMap(requestMap, false)) {
                    Nutrition nutrition = getNutritionsFromMap(requestMap, false);
                    if (nutrition.getBatiment() == null) {
                        return AvicoleUtils.getResponseEntity("Le Batiment id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    nutritionDao.save(nutrition);
                    return AvicoleUtils.getResponseEntity("Nutrition ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Nutrition getNutritionsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Nutrition nutrition = new Nutrition();
        if (isAdd) {
            nutrition.setId(Integer.parseInt(requestMap.get("id")));
        }
        nutrition.setDesignation(requestMap.get("designation"));

        if (requestMap.containsKey("quantite") && requestMap.containsKey("quantiteSortie")) {
            try {
                double quantite = Double.parseDouble(requestMap.get("quantite"));
                double quantiteSortie = Double.parseDouble(requestMap.get("quantiteSortie"));
                nutrition.setQuantite(quantite);
                nutrition.setQuantiteSortie(quantiteSortie);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Ajout de la dateDebut et dateFin
        if (requestMap.containsKey("dateEntree") && requestMap.containsKey("dateSortie")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateEntree = dateFormat.parse(requestMap.get("dateEntree"));
                Date dateSortie = dateFormat.parse(requestMap.get("dateSortie"));
                nutrition.setDateEntree(dateEntree);
                nutrition.setDateSortie(dateSortie);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation de la relation "batiment"
        if (requestMap.containsKey("batiment")) {
            try {
                Integer batimentId = Integer.parseInt(requestMap.get("batiment"));
                Batiment batiment = batimentDao.findById(batimentId).orElse(null);
                nutrition.setBatiment(batiment);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return nutrition;
    }






    private boolean validateNutritionMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("batiment")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }
    @Override
    public ResponseEntity<List<Nutrition>> getAllNutrition() {
        try {
            return new ResponseEntity<List<Nutrition>>(nutritionDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateNutrition(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateNutritionMap(requestMap, true)){
                    Optional optional = nutritionDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        nutritionDao.save(getNutritionsFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Nutrition modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Nutrition id dosen't exist", HttpStatus.OK);
                    }
                }
                return AvicoleUtils.getResponseEntity(AvicoleConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteNutrition(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = nutritionDao.findById(id);
                if (!optional.isEmpty()){
                    nutritionDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Nutrition avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Nutrition id dosen't existe", HttpStatus.OK);
                }

            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
