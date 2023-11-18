package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.BatimentRest;
import com.dione.gestion_avicole.service.BatimentService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@RestController
public class BatimentRestImpl implements BatimentRest {

    private BatimentService batimentService;

    public BatimentRestImpl(BatimentService batimentService) {
        this.batimentService = batimentService;
    }


    @Override
    public ResponseEntity<String> ajoutBatiment(Map<String, String> requestMap) {
        try {
            return batimentService.ajoutBatiment(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<List<Batiment>> getAllBatiment() {
        try {
            return batimentService.getAllBatiment();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateBatiment(Map<String, String> requestMap) {
        try {
            return batimentService.updateBatiment(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteBatiment(Integer id) {
        try {
            return batimentService.deleteBatiment(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> getBatimentDesignationById(Integer id) {
        try {
            return batimentService.getBatimentDesignationById(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Long countTotalBatiments() {
        try {
            return batimentService.countTotalBatiments();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des bâtiments.", ex);
        }
    }

}
