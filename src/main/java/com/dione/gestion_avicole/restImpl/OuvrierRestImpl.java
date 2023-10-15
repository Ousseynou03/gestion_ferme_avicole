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

    private OuvrierSerice ouvrierSerice;

    public OuvrierRestImpl(OuvrierSerice ouvrierSerice) {
        this.ouvrierSerice = ouvrierSerice;
    }

    @Override
    public ResponseEntity<String> ajoutOuvrier(Map<String, String> requestMap) {
        try {
            return ouvrierSerice.ajoutOuvrier(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Ouvrier>> getAllOuvrier() {
        try {
            return ouvrierSerice.getAllOuvrier();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateOuvrier(Map<String, String> requestMap) {
        try {
            return ouvrierSerice.updateOuvrier(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteOuvrier(Integer id) {
        try {
            return ouvrierSerice.deleteOuvrier(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
