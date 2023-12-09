package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Paiement;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.PaiementRest;
import com.dione.gestion_avicole.service.PaiementService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class PaiementRestImpl implements PaiementRest {

    private PaiementService paiementService;

    public PaiementRestImpl(PaiementService paiementService) {
        this.paiementService = paiementService;
    }

    @Override
    public ResponseEntity<String> ajoutPaiement(Map<String, String> requestMap) {
        try {
            return paiementService.ajoutPaiement(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Paiement>> getAllPaiement() {
        try {
            return paiementService.getAllPaiement();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePaiement(Map<String, String> requestMap) {
        try {
            return paiementService.updatePaiement(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deletePaiement(Integer id) {
        try {
            return paiementService.deletePaiement(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
