package com.dione.gestion_avicole.restImpl;


import com.dione.gestion_avicole.POJO.Depense;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.DepenseRest;
import com.dione.gestion_avicole.service.DepenseService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class DepenseRestImpl implements DepenseRest {

    private DepenseService depenseService;

    public DepenseRestImpl(DepenseService depenseService) {
        this.depenseService = depenseService;
    }

    @Override
    public ResponseEntity<String> ajoutDepense(Map<String, String> requestMap) {
        try {
            return depenseService.ajoutDepense(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Depense>> getAllDepense() {
        try {
            return depenseService.getAllDepense();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateDepense(Map<String, String> requestMap) {
        try {
            return depenseService.updateDepense(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteDepense(Integer id) {
        try {
            return depenseService.deleteDepense(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Integer totalDepense() {
        try {
            return depenseService.totalDepense();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des dépenses.", ex);
        }
    }
}
