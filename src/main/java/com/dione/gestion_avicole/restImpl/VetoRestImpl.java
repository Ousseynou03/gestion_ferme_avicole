package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Veterinaire;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.VetoRest;
import com.dione.gestion_avicole.service.VetoService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class VetoRestImpl implements VetoRest {

    private final VetoService vetoService;

    public VetoRestImpl(VetoService vetoService) {
        this.vetoService = vetoService;
    }

    @Override
    public ResponseEntity<String> ajoutVeto(Map<String, String> requestMap) {
        try {
            return vetoService.ajoutVeto(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Veterinaire>> getAllVeto() {
        try {
            return vetoService.getAllVeto();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateVeto(Map<String, String> requestMap) {
        try {
            return vetoService.updateVeto(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteVeto(Integer id) {
        try {
            return vetoService.deleteVeto(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
