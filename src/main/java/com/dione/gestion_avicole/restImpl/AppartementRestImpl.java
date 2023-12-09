package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Mortalite;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.AppartementRest;
import com.dione.gestion_avicole.service.AppartementService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class AppartementRestImpl implements AppartementRest {

    private AppartementService appartementService;

    public AppartementRestImpl(AppartementService appartementService) {
        this.appartementService = appartementService;
    }

    @Override
    public ResponseEntity<String> ajoutAppartement(Map<String, String> requestMap) {
        try {
            return appartementService.ajoutAppartement(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Appartement>> getAllAppartement() {
        try {
            return appartementService.getAllAppartement();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateAppartement(Map<String, String> requestMap) {
        try {
            return appartementService.updateAppartement(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteAppartement(Integer id) {
        try {
            return appartementService.deleteAppartement(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
