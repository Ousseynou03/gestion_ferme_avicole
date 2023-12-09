package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Locataire;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.LocataireRest;
import com.dione.gestion_avicole.service.LocataireService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class LocataireRestImpl implements LocataireRest {

    private LocataireService locataireService;

    public LocataireRestImpl(LocataireService locataireService) {
        this.locataireService = locataireService;
    }

    @Override
    public ResponseEntity<String> ajoutLocataire(Map<String, String> requestMap) {
        try {
            return locataireService.ajoutLocataire(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Locataire>> getAllLocataire() {
        try {
            return locataireService.getAllLocataire();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateLocataire(Map<String, String> requestMap) {
        try {
            return locataireService.updateLocataire(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteLocataire(Integer id) {
        try {
            return locataireService.deleteLocataire(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
