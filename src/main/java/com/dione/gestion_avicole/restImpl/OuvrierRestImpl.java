package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Ouvrier;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.OuvrierRest;
import com.dione.gestion_avicole.service.OuvrierSerice;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class OuvrierRestImpl implements OuvrierRest {

    private final OuvrierSerice ouvrierService;

    public OuvrierRestImpl(OuvrierSerice ouvrierSerice) {
        this.ouvrierService = ouvrierSerice;
    }

    @Override
    public ResponseEntity<String> ajoutOuvrier(Map<String, String> requestMap) {
        try {
            return ouvrierService.ajoutOuvrier(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Ouvrier>> getAllOuvrier() {
        try {
            return ouvrierService.getAllOuvrier();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateOuvrier(Map<String, String> requestMap) {
        try {
            return ouvrierSerice.updateOuvrier(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/

    @Override
    public ResponseEntity<String> updateOuvrier(Integer ouvrierId, Map<String, String> requestMap) {
        try {
            return ouvrierService.updateOuvrier(ouvrierId, requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> deleteOuvrier(Integer id) {
        try {
            return ouvrierService.deleteOuvrier(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
